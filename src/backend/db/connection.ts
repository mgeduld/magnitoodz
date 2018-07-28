import knex = require('knex')
import kenxConfig = require('../../../knexfile')

const environment = process.env.NODE_ENV || 'development';
const config = kenxConfig[environment];

export const connection = knex(config);
