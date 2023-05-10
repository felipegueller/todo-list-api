import { Router } from "express";

import {
  index,
  find,
  create,
  update,
  remove
}
from '../controllers/task-list.controller'

const listRouter = Router()

listRouter.get('/', index)
listRouter.post('/', create)
listRouter.get('/:id', find)
listRouter.put('/:id', update)
listRouter.delete('/:id', remove)

export {
  listRouter
}
