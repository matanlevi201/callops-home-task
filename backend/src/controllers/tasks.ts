import { Request, Response } from "express";
import prisma from "../db";
import { NotFoundError } from "../errors";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.status(200).send(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { callId, description } = req.body;
  const [newTask, updatedCall] = await prisma.$transaction([
    prisma.task.create({ data: { callId, description } }),
    prisma.call.update({
      where: { id: callId },
      data: { updatedAt: new Date() },
    }),
  ]);
  res.status(201).send({ newTask, updatedAt: updatedCall.updatedAt });
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const existingTask = await prisma.task.findUnique({ where: { id } });
  if (!existingTask) {
    throw new NotFoundError();
  }
  const [task] = await prisma.$transaction([
    prisma.task.update({
      where: { id },
      data: { status },
    }),
    prisma.call.updateMany({
      where: {
        tasks: {
          some: {
            id,
          },
        },
      },
      data: {
        updatedAt: new Date(),
      },
    }),
  ]);
  res.status(200).send(task.updatedAt);
};
