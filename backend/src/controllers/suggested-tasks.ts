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
  const suggestedTask = await prisma.suggestedTask.create({
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
  res.status(201).send(suggestedTask);
};

export const updateSuggestedTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const existingSuggestedTask = await prisma.suggestedTask.findUnique({
    where: { id },
  });
  if (!existingSuggestedTask) {
    throw new NotFoundError();
  }
  await prisma.$transaction([
    prisma.suggestedTask.update({
      where: { id },
      data: { status },
    }),
  ]);
  res.status(200).send();
};
