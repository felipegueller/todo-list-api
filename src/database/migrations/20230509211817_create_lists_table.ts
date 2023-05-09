import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('lists')
  if (hasTable) return

  return knex.schema.createTable('lists', table => {
    table.increments('id').primary().notNullable()
    table.string('name', 255).unique().notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('lists')
}
