import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('tasks')
  if (hasTable) return

  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary().notNullable()
    table.string('title', 255).notNullable()
    table.text('description', 'mediumtext').notNullable()
    table.datetime('conclusion_date').nullable()
    table.boolean('done').defaultTo(false)
    table.integer('list_id').unsigned().notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('list_id').references('id').inTable('task_list')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('tasks')
}
