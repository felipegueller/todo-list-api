import { Request, Response } from "express"
import { TaskModel } from "../models/task.model"

const taskModel = new TaskModel()

const index = async (req: Request, res: Response) => {
  try {
    const data = await taskModel.getAll()

    return res.json({ data })
  } catch (error: any) {
    res.status(500).json({
      message: error['message']
    })
  }
}

const find = async (req: Request, res: Response) => {}

const create = async (req: Request, res: Response) => {}

const update = async (req: Request, res: Response) => {}

const remove = async (req: Request, res: Response) => {}

export {
  index,
  find,
  create,
  update,
  remove
}