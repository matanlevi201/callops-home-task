import { Request, Response } from "express";

export const getTags = async (req: Request, res: Response) => {
  res.status(200).send([]);
};

export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;
  res.status(201).send();
};

export const updateTag = async (req: Request, res: Response) => {
  const { id: tagId } = req.params;
  const { name } = req.body;
  res.status(204).send();
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id: tagId } = req.params;
  res.status(204).send();
};
