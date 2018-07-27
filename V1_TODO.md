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

* [] set up code-base infrustructure
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
    * [] add unit-testing framework
    * [] add code-coverage tool
* [x] set up postgresql
    * [x] install
    * [x] create db
    * [x] add knex
    * [x] add knexfile
    * [x] create migrations to create tables
    * [x] create seed files
    * [x] add db creation, migrations, and seeding to setup.sh
* [] set up frontend infrustructure
    * [] react
    * [] redux
    * [] recompose
    * [] sagas
    * [] action creators
    * [] react router
    * [] tachyons
    * [] constants
    * [] utils
* [] set up backend infrustructure
    * [] express
    * [] api
    * [] queries
    * [] utils
* [] make api
    * [] signup
    * [] login
    * [] logout
    * [] get Magnitoodz
    * [] get Magnitood
    * [] post Magnitood
* [] make "pages"
    * [] home - description and list
    * [] about
    * [] Magnitood
    * [] create
    * [] signup
    * [] login
    * [] create ability to log out
    * [] create loader...
* [] make frontend controllers
    * [] reducers
    * [] sagas
    * [] action creators
    * [] composed componants
    * [] routes
* [] remove repo, clone, try re-init
* [] finalize V1 README

