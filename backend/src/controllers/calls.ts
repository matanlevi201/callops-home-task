import { Request, Response } from "express";
import prisma from "../db";
import { NotFoundError } from "../errors";

export const getCalls = async (req: Request, res: Response) => {
  const calls = await prisma.call.findMany({
    include: {
      callTags: {
        include: {
          tag: true,
        },
      },
    },
  });
  res.status(200).send(calls);
};

export const createCall = async (req: Request, res: Response) => {
  const { title, description, tagIds = [] } = req.body;
  const newCall = await prisma.call.create({
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
    },
  });
  res.status(201).send(newCall);
};

export const updateCall = async (req: Request, res: Response) => {
  const { id: callId } = req.params;
  res.status(204).send();
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
