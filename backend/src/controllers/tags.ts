import { Request, Response } from "express";
import prisma from "../db";
import { NotFoundError } from "../errors";

export const getTags = async (req: Request, res: Response) => {
  const tags = await prisma.tag.findMany();
  res.status(200).send(tags);
};

export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newTag = await prisma.tag.create({
    data: {
      name,
    },
  });
  res.status(201).send(newTag);
};

export const updateTag = async (req: Request, res: Response) => {
  const { id: tagId } = req.params;
  const { name } = req.body;
  const existingTag = await prisma.tag.findUnique({ where: { id: tagId } });
  if (!existingTag) {
    throw new NotFoundError();
  }
  const [updatedTag] = await prisma.$transaction([
    prisma.tag.update({
      where: { id: tagId },
      data: { name },
    }),
    prisma.call.updateMany({
      where: {
        callTags: {
          some: {
            tagId,
          },
        },
      },
      data: {
        updatedAt: new Date(),
      },
    }),
  ]);
  res.status(200).send(updatedTag);
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id: tagId } = req.params;
  const existingTag = await prisma.tag.findUnique({ where: { id: tagId } });
  if (!existingTag) {
    throw new NotFoundError();
  }
  await prisma.tag.delete({ where: { id: tagId } });
  res.status(204).send();
};
