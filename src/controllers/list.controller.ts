import { Request, Response } from 'express'

import { List } from '../interfaces/list.interface'

import { ListModel } from '../models/list.model'

const listModel = new ListModel()

const index = async (req: Request, res: Response) => {
  try {
    const data = await listModel.getAll()

    return res.json({ data })
  } catch (error: any) {
    res.status(500).json({
      message: error['message']
    })
  }
}
const find = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id)

  try {
    const data: List = await listModel.getOne(id)

    res.json({ data })
  } catch (error: any) {
    res.status(500).json({
      message: error['message']
    })
  }
}

const create = async (req: Request, res: Response) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({
      message: 'You need to send name'
    })
  }

  try {
    const findList: List[] = await listModel.getListByName(name)

    if (findList.length) {
      return res.status(400).json({
        message: 'the list name alredy exists'
      })
    }

    const data = await listModel.insert(name)

    res.json({
      id: data[0],
      message: 'list created'
    })
  } catch (error: any) {
    res.status(500).json({
      message: error['message']
    })
  }
}

const update = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id)
  const { name } = req.body

  if (!name) {
    return res.status(400).json({
      message: 'You need to send name'
    })
  }

  try {
    const findList: List[] = await listModel.getListByName(name)
    const alredyExistsListName = findList.length && findList[0].id !== id

    if (alredyExistsListName) {
      return res.status(400).json({
        message: 'the list name alredy exists'
      })
    }

    const data = await listModel.update(id, name)

    if (!data) {
      return res.status(404).json({
        message: 'list not found'
      })
    }

    res.json({
      id,
      message: 'list updated'
    })
  } catch (error: any) {
    res.status(500).json({
      message: error['message']
    })
  }
}
const remove = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id)

  try {
    const list: List = await listModel.getOne(id)

    if (list.tasks?.length) {
      return res.status(400).json({
        message: 'that list contains tasks'
      })
    }

    await listModel.remove(id)

    res.json({
      id,
      message: 'list deleted'
    })
  } catch (error: any) {
    res.status(500).json({
      message: error['message']
    })
  }
}

export { index, find, create, update, remove }
