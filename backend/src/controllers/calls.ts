import { Request, Response } from "express";
import prisma from "../db";
import { NotFoundError } from "../errors";

export const getCalls = async (req: Request, res: Response) => {
  const callsRaw = await prisma.call.findMany({
    include: {
      callTags: {
        include: {
          tag: true,
        },
      },
      tasks: {
        include: {},
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  const calls = callsRaw.map((call) => ({
    ...call,
    callTags: call.callTags.map((callTag) => callTag.tag),
  }));
  res.status(200).send(calls);
};

export const createCall = async (req: Request, res: Response) => {
  const { title, description, tagIds = [] } = req.body;
  const newCallRaw = await prisma.call.create({
    data: {
      title,
      description,
      callTags: {
        create: tagIds.map((tagId: string) => ({
          tag: {
            connect: { id: tagId },
          },
        })),
      },
    },
    include: {
      callTags: {
        include: { tag: true },
      },
      tasks: {
        include: {},
      },
    },
  });
  const newCall = {
    ...newCallRaw,
    callTags: newCallRaw.callTags.map((callTag) => callTag.tag),
  };
  res.status(201).send(newCall);
};

export const addCallTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tagId } = req.body;
  const existingCall = await prisma.call.findUnique({ where: { id } });
  if (!existingCall) {
    throw new NotFoundError();
  }
  const [, updatedCall] = await prisma.$transaction([
    prisma.callTag.create({ data: { callId: id, tagId } }),
    prisma.call.update({ where: { id }, data: { updatedAt: new Date() } }),
  ]);
  res.status(200).send(updatedCall.updatedAt);
};

export const removeCallTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tagId } = req.body;
  const existingCall = await prisma.call.findUnique({ where: { id } });
  if (!existingCall) {
    throw new NotFoundError();
  }
  const [, updatedCall] = await prisma.$transaction([
    prisma.callTag.delete({
      where: {
        callId_tagId: {
          callId: id,
          tagId: tagId,
        },
      },
    }),
    prisma.call.update({ where: { id }, data: { updatedAt: new Date() } }),
  ]);
  res.status(200).send(updatedCall.updatedAt);
};

export const deleteCall = async (req: Request, res: Response) => {
  const { id: callId } = req.params;
  const existingCall = await prisma.call.findUnique({ where: { id: callId } });
  if (!existingCall) {
    throw new NotFoundError();
  }
  await prisma.call.delete({ where: { id: callId } });
  res.status(204).send();
};
