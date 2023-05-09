import { Router } from "express";

const listRouter = Router()

listRouter.get('/')
listRouter.post('/')
listRouter.get('/:id')
listRouter.put('/:id')
listRouter.delete('/:id')

export {
  listRouter
}
