import { db } from '../database/database'

import { Task } from '../interfaces/task.interface'

export class TaskModel {
  async getAll() {
    return await db
      .select(
        'id',
        'title',
        'description',
        'conclusion_date',
        'done',
        'list_id'
      )
      .from('tasks')
      .orderBy('id')
  }

  async getOne(id: number) {
    return await db
      .select(
        'id',
        'title',
        'description',
        'conclusion_date',
        'done',
        'list_id'
      )
      .from('tasks')
      .where({ id })
  }

  async insert(task: Task): Promise<number> {
    const data = await db('tasks').insert(task)

    return data[0]
  }

  async update(id: number, task: Task): Promise<number> {
    return await db('tasks')
      .update({
        ...task,
        updated_at: db.fn.now()
      })
      .where({ id })
  }

  async remove(id: number) {
    return await db('tasks').where({ id }).del()
  }

  async markTask(id: number, done: boolean, conclusion_date: string) {
    return await db('tasks')
      .update({
        done,
        conclusion_date,
        updated_at: db.fn.now()
      })
      .where({ id })
  }
}
