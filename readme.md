# Overview

Get a feeling for the backend of a web application with Backbone.js

## Basic API

This example shows the usage of a basic API with RESTFul endpoints for the movies.

The full stack application uses two server processes. One server process provides the backend.
The other process provides the frontend application.

To start the backend (API) server process use:

    $ node api.js

To start the frontend server process use:

    $ node server.js


Since you need to work with two server processes at once, you can use the Gruntfile to manage both processes.

This should look as follows:

    Running "browserify:app" (browserify) task
    
    Running "runFrontend" task
    
    Running "runAPI" task
    
    Running "watch" task
    Waiting...
    [nodemon] 1.9.2
    [nodemon] 1.9.2
    [nodemon] to restart at any time, enter `rs`
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: *.*
    [nodemon] watching: *.*
    [nodemon] starting `node server.js`
    [nodemon] starting `node api.js`
    Frontend listening at 5000
    api listening at 5001
