# Angular Movies Simple Task [Eden-Tech]

## Simple Movies Directory

### Overview

Your task is to develop a simple movies directory. The idea is that user can search for a film by name and view selected movie summary.
Movie information would be collected from a public movies database API called OMDb.
Functional Requirements
Users should be able to search for movies by title.
oUsers should be able to sort the result by title or year.
oUsers can set how many results appear per page in search.
osearch results should show the movie poster as thumbnail.
Users should be able to view the details for one of the movies from the search results.

### Technical Details

Check the wireframe at the bottom of the document
Use https://www.omdbapi.com/ as your backend.
oRegister for free api key through https://www.omdbapi.com/apikey.aspx
You will receive email with API_KEY to use with your requests
oTo search for movies by title, use https://www.omdbapi.com/?s=<SEARCH_KEYWORD>&apikey=<API_KEY>
oTo view a movie details, use https://www.omdbapi.com/?i=<IMDB_ID>&apikey=<API_KEY>
IMDB_ID is returned in the search API response for each movie.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## Development server

_1_ Run `json-server --watch src\db\db.json` for a backend server. <br/>
_2_ Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
