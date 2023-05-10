import { Knex } from 'knex'
import { db } from '../database/database'

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

  async getOne(id: number) {}

  async insert(name: string) {}

  async update(id: number, name: string) {}

  async remove(id: number) {}
}
