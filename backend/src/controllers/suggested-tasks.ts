import { Request, Response } from "express";
import prisma from "../db";
import { NotFoundError } from "../errors";

export const getSuggestedTasks = async (req: Request, res: Response) => {
  const suggestedTasksRaw = await prisma.suggestedTask.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
  const suggestedTasks = suggestedTasksRaw.map((suggestedTask) => ({
    ...suggestedTask,
    tags: suggestedTask.tags.map((tag) => tag.tag),
  }));
  res.status(200).send(suggestedTasks);
};

export const createSuggestedTask = async (req: Request, res: Response) => {
  const { description, tagIds = [] } = req.body;
  const suggestedTaskRaw = await prisma.suggestedTask.create({
    data: {
      description,
      tags: {
        create: tagIds.map((tagId: string) => ({
          tag: {
            connect: { id: tagId },
          },
        })),
      },
    },
    include: {
      tags: {
        include: { tag: true },
      },
    },
  });
  const suggestedTask = {
    ...suggestedTaskRaw,
    tags: suggestedTaskRaw.tags.map((tag) => tag.tag),
  };
  res.status(201).send(suggestedTask);
};

export const updateSuggestedTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, tagIds } = req.body;
  const existingSuggestedTask = await prisma.suggestedTask.findUnique({
    where: { id },
  });
  if (!existingSuggestedTask) {
    throw new NotFoundError();
  }
  await prisma.$transaction([
    prisma.suggestedTask.update({
      where: { id },
      data: { description },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    }),
    ...(!tagIds
      ? []
      : [
          prisma.suggestedTaskTag.deleteMany({
            where: { suggestedTaskId: id },
          }),
          prisma.suggestedTaskTag.createMany({
            data: tagIds.map((tagId: string) => ({
              tagId,
              suggestedTaskId: id,
            })),
          }),
        ]),
  ]);
  const updatedSuggestedTaskRaw = await prisma.suggestedTask.findFirst({
    where: { id },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
  const suggestedTask = {
    ...updatedSuggestedTaskRaw,
    // can use this: "i" cause we know for a fact it exists
    // refer to condition at top of the controller
    tags: updatedSuggestedTaskRaw!.tags.map((tag) => tag.tag),
  };
  res.status(200).send(suggestedTask);
};

export const updateSuggestedTaskStatus = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { callId, status } = req.body;
  const existingSuggestedTask = await prisma.suggestedTask.findUnique({
    where: { id },
  });
  if (!existingSuggestedTask) {
    throw new NotFoundError();
  }
  const [, updatedCall] = await prisma.$transaction([
    prisma.suggestedTask.update({
      where: { id },
      data: { status },
    }),
    prisma.call.update({
      where: { id: callId },
      data: { updatedAt: new Date() },
    }),
  ]);
  res.status(200).send(updatedCall.updatedAt);
};
