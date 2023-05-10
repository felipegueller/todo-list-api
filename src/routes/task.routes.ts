import { Router } from "express";

import {
  index,
  find,
  create,
  update,
  remove
}
from '../controllers/task.controller'

const taskRouter = Router()

taskRouter.get('/', index)
taskRouter.post('/', create)
taskRouter.get('/:id', find)
taskRouter.put('/:id', update)
taskRouter.delete('/:id', remove)

export {
  taskRouter
}
