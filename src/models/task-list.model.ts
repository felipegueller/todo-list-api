import { Knex } from 'knex'
import { db } from '../database/database'

import { TaskList } from '../interfaces/task-list.interface'

export class TaskListModel {
  async getAll() {
    return await db.select('id', 'name').from('task_list').orderBy('id')
  }
  async getOne(id: number) {
    return await db.transaction(async (trx: Knex) => {
      const list: TaskList[] = await trx
        .select('id', 'name')
        .from('task_list')
        .where({ id })

      if (!list.length) throw new Error('list not found')

      const tasks = await trx
        .select('id', 'title', 'description', 'done')
        .from('tasks')
        .where({ list_id: id })

      const data = { ...list[0] }
      data.tasks = tasks

      return data
    })
  }

  async getListByName(name: string): Promise<TaskList[]> {
    return await db('task_list').where({ name })
  }

  async insert(name: string) {
    return db('task_list').insert({ name })
  }

  async update(id: number, name: string): Promise<number> {
    return await db('task_list')
      .update({ name, updated_at: db.fn.now() })
      .where({ id })
  }

  async remove(id: number) {
    return await db('task-list').where({ id }).del()
  }
}
