cp .env.sample .env
createdb magnitoodz
npm install
knex migrate:latest
knex seed:run