import { Knex } from 'knex'
import { db } from '../database/database'

import { List } from './../interfaces/list.interface'

export class ListModel {
  async getAll() {
    return await db.select('id', 'name').from('lists').orderBy('id')
  }
  async getOne(id: number) {
    return await db.transaction(async (trx: Knex) => {
      const list: List[] = await trx
        .select('id', 'name')
        .from('lists')
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

  async getListByName(name: string): Promise<List[]> {
    return await db('lists').where({ name })
  }

  async insert(name: string) {
    return db('lists').insert({ name })
  }

  async update(id: number, name: string): Promise<number> {
    return await db('lists').update({ name }).where({ id })
  }
  
  async remove(id: number) {
    return await db('lists').where({ id }).del()
  }
}
