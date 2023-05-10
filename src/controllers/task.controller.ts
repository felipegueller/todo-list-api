import { Request, Response } from 'express'

import { Task } from '../interfaces/task.interface'

import { TaskModel } from '../models/task.model'

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

const find = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  console.log(id)
  try {
    const data = await taskModel.getOne(id)

    return res.json({ data })
  } catch (error: any) {
    res.status(500).json({
      message: error['message']
    })
  }
}

const create = async (req: Request, res: Response) => {
  const { title, description, done, conclusion_date, list_id } = req.body
  const requiredValidation = !title || !description || !list_id

  if (requiredValidation) {
    return res.status(400).json({
      message: 'you need send title, description and list_id'
    })
  }

  try {
    const task: Task = {
      title,
      description,
      done: done || false,
      conclusion_date: conclusion_date || null,
      list_id
    }

    const data: number = await taskModel.insert(task)

    return res.json({
      id: data,
      message: 'task created'
    })
  } catch (error: any) {
    res.status(500).json({
      message: error['message']
    })
  }
}

const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { title, description, done, conclusion_date } = req.body
  const requiredValidation = !title || !description

  if (requiredValidation) {
    return res.status(400).json({
      message: 'you need send title and description'
    })
  }

  try {
    const task: Task = {
      title,
      description,
      done: done || false,
      conclusion_date: conclusion_date || null
    }

    const data: number = await taskModel.update(id, task)

    if (!data) {
      return res.status(404).json({
        message: 'task not found'
      })
    }

    return res.json({
      id: id,
      message: 'task updated'
    })
  } catch (error: any) {
    res.status(500).json({
      message: error['message']
    })
  }
}

const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const data: number = await taskModel.remove(id)

    if (!data) {
      return res.status(404).json({
        message: 'task not found'
      })
    }

    return res.json({
      id: id,
      message: 'task deleted'
    })
  } catch (error: any) {
    res.status(500).json({
      message: error['message']
    })
  }
}

export { index, find, create, update, remove }
