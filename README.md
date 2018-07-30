# magnitoodz

## About 

Magnitooz is a web app for making comparisons. It's inspired by Carl Sagon's Cosmic Calendar, which entralled me in my youth and gave me a viscerl undestanding of the age of the Universe.

This app allows users to create comparisons (visualied as line charts) and view the ones they and other users have created.

![contents](https://www.dropbox.com/s/7ivbvv9tth9l5v8/contents.png?dl=0)
![dinosaurs vs humans](https://www.dropbox.com/s/tjg7tlkwsb51bqp/dinosaurs.png?dl=0g)
![jellyfish vs humans](https://www.dropbox.com/s/9dkf3peqkkkusiq/jellyfish.png?dl=0)

## Project status

As you can see, the "artwork" and "design" is just roughed in. Currently, the code allows users to create and view comparisons (Manitoodz). That's about it for the front-end. On the back-end, I've coded an authentication system. The next step will be to write the front-end forms for signing up, logging in, and so on. The site won't be launched until that's in place, as I consider it necessary for a minuminum-viable product. 

[Here is a detailed TODO list.](notes/01_TODO.md)

## Tech stack
- postgres
- knex
- node/express
- react
- redux
- react-router
- recompose
- ava (unit tests)

## Installation

- install [postgresql](https://www.postgresql.org/download/)
- `./setup.sh`

## Local development

In three terminal windows:

1. `npm run build:frontend:dev`
2. `npm run build:backend:dev`
3. `npm start:backend:dev`

## Testing

`npm run test`

## Notes

VSCode displays some annoying error message unless this is added to its user settings: `"typescript.tsdk": "node_modules/typescript/lib"`