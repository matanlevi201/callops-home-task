import { Request, Response } from "express";

export const getCalls = async (req: Request, res: Response) => {
  res.status(200).send([]);
};

export const createCall = async (req: Request, res: Response) => {
  const { title, description, tagIds } = req.body;
  res.status(201).send();
};

export const updateCall = async (req: Request, res: Response) => {
  const { id: callId } = req.params;
  res.status(204).send();
};

export const deleteCall = async (req: Request, res: Response) => {
  const { id: callId } = req.params;
  res.status(204).send();
};
