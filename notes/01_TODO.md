# Todo

## Goal

V1 is a mimimum-viable product

Magnitoodz allows users to visualize the differences between two sets of values. The primary use case is spans of time, e.g. the age of the Universe vs the age of the human species. But it can be used for other sorts of values, too, such as a comparison between the distances of Earth to the Moon and Earth to Mars. Each of these comparisons will be called a Magnitood.

Each Magnitood will be displayed on its own "page" with its own unique url. Also displayed will be the name of the user who created it and some accompanying text, if it was specified at the time of creation.

Users will be able to register, log in, and log out. Only logged-in users will be able to create Magnitoodz, but everyone will be able to see them.

## Todo for later versions

- dockerizing
- deploying
- password reset
- signup confirmation
- editing saved Magnitoodz
- rating Magnitoodz
- tagging Magnitoodz
- comments?
- embedding?
- display list of popular Magnitoodz
- display tag list
- display Magnitoodz of as particular user
- display latest Magnitoodz
- display a random Magnitood
- forward/back flip from Magnitood to Magnitood?
- mobile
- email a Magnitood?
- favorites?

## Tasks

* [x] set up code-base infrustructure
    * [x] add .gitignore
    * [x] add parcel
    * [x] add nodemon
    * [x] set up src folder structure
        * [x] frontend dir
        * [x] backend dir
    * [x] frontend and backend should compile to separate dist folders with parcel
    * [x] set up build scripts
    * [x] set up a run script
    * [x] add setup.sh with npm install
    * [x] add build and run instructions to the README
    * [x] configure env variable system
    * [x] add tslint
    * [x] add @types/node
    * [x] add @types/express
    * [x] add unit-testing framework
    * [x] add code-coverage tool
    * [x] add types.d.ts with basic info, e.g. declare module '*.png'
* [x] set up postgresql
    * [x] install
    * [x] create db
    * [x] add knex
    * [x] add knexfile
    * [x] create migrations to create tables
    * [x] create seed files
    * [x] add db creation, migrations, and seeding to setup.sh
* [x] set up frontend infrustructure
    * [x] react
    * [x] redux
    * [x] recompose
    * [x] sagas
    * [x] action creators
    * [x] react router
    * [x] tachyons
    * [x] constants
    * [x] utils
* [x] set up backend infrustructure
    * [x] express
    * [x] api
    * [x] queries
    * [x] utils
* [x] make api
    * [x] signup
    * [x] login
    * [x] logout
    * [x] get Magnitoodz
    * [x] get Magnitood
    * [x] post Magnitood
* [] make "pages"
    * [x] list
    * [x] Magnitood
    * [*] about
    * [*] create
    * [] signup
    * [] login
    * [] create ability to log out
    * [] create loader...
* [x] make frontend controllers for magnitoodz
    * [x] reducers
    * [x] sagas
    * [x] action creators
    * [x] routes
* [] make frontend controllers for authentication
    * [] reducers
    * [] sagas
    * [] action creators
    * [] routes
* [] remove repo, clone, try re-init
* [] finalize V1 README
* [] stragglers
    * [] refactor big functions
    * [] beef up validation
    * [] get rid of all magin strings/numbers
    * [] join tables to return user data with magnitoodz
    * [] add limits and offset to list query + frontend
    * [] refactor big magnitood component and others
    * [] unit tests for front-end code
    * [] make typescript play nice with recompose
    * [] pagination
    * [] settle on one way to handle forms
    * [] centralize validation
    * [] display api catch errors to user
    * [] make sure all modules only export from index (front/back)

