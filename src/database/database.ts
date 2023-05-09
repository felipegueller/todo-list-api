import { Knex } from "knex"

const knexfile = require('../../knexfile')
const db: Knex = require('knex')(knexfile)

export { db }