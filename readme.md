# iTunes API Proxy

The application simply proxies two endpoints of iTunes API, `search` and `lookup`. The whole project is structured as two different parts, __clinet__ folder containing FE codebase writtern in React, Redux and setup by webpack for module bundling.
It also has a __server__ folder in which the whole API server is implemented.

# Documentation

## Server
---
---

The server uses __express__ as the base framework. The main file that starts the whole process is [server.js](server/server.js)

### Middlewares

* CORS: server uses _CORS_ middleware to enable cors headers and methods on the API endpoints.

* ReponseTime: server uses _ResponseTime_ middleware to enable `X-RESPONSE_TIME` header on responses indicating the amount of time that took server to response to the request.

* Cache: It also uses a custom caching middleware that enables Redis on API requests, intercepting requests and automatically respond to them via Redis queries.

### Environment

The server defines environemtn dependant constants such as running port in [.env](server/.env).
You could also find a sample list of constants needed by the server in a production env file.

Other than the `.env` file, it also manages constants in [constants.js](server/constants.js).

### Logs

The server uses [Winston.js](https://github.com/winstonjs/winston) as it's logging mechanism. It supports different level of logs and different transport methods as well.

> On production, the log service will log all log levels combined in [logs.log](server/logs/logs.log) and also error logs in [error.log](server/logs/error.log).

> On development, it also logs to the stdout (_console.log_) of the running shell.

You could find the codebase managing the log service in [log.js](server/services/logger.js)

### Exceptions and Errors

For a solid way to manage all exceptions, they are listed in [exceptions.js](server/sevices/exceptions.js). The object stored in exceptions file can be sent to FE for a list of supported exceptions and a proper error handling.

> To handle validation errors on response, such as validating query parameters and error messages, you can find helper methods in [error.js](server/services/error.js).

### Cache

The server uses Redis as a caching storage. It simply stores the url of the request such as `"/api/v1/search?term=james%20blunt&media=all&entity=movie"` with all the query params as a key and the response of it as a value in Redis storage.

Using this method, every combination of parameters will only be queried from iTunes endpoint and will be served from cache after that. You could see it in action by checking `X-Response-Time` header in response.

The caching logic is handled in both [(SET) routes.js](server/routes.js) and as a middleware in [(GET) server.js](server/server.js) and [GET) cache.js](server/services/cache.js).

## API
---
---

### Endpoints

* `/search`

  Query Parameters:

    * __term__: the statement to search for, e.g `James+Blunt`
    * __media__ : Value from supported list of media types:
    
      * all
      * movie
      * podcast
      * music
      * musicVideo
      * audiobook
      * shortFilm
      * tvShow
      * software
      * ebook
    
    * __entity__: Each media type has a list of supported entites:

      * [movie]: movieArtist, movie
      * [podcast]: podcastAuthor, podcast
      * [music]: musicArtist, musicTrack, album, musicVideo, mix, song
      * [musicVideo]: musicArtist, musicVideo
      * [audiobook]: audiobookAuthor, audiobook
      * [shortFilm]: shortFilmArtist, shortFilm
      * [tvShow]: tvEpisode, tvSeason
      * [software]: software, iPadSoftware, macSoftware
      * [ebook]: ebook
      * [all]: movie, album, allArtist, podcast, musicVideo, mix, audiobook, tvSeason, allTrack
    
* `/lookup`:

  Query Parameters:

    * An ID variant from the following list:

      * [id]: iTunes ID or iTunes artist ID
      * [amgArtistId]: AMG artist ID(s)

        > If you wanna send multiple amg artist ids, send it comma seperated such as: _1234,2345_

      * [UPC]: Album's or Track's UPC
      * [amgAlbumId]: Album's angAlbumId
      * [amgVideoId]: Video's amgVideoId
      * [ISBN]: 13 Digit ISBN of a book

      * __media__ : Value from supported list of media types:
    
        * all
        * movie
        * podcast
        * music
        * musicVideo
        * audiobook
        * shortFilm
        * tvShow
        * software
        * ebook
    
      * __entity__: Each media type has a list of supported entites:

        * [movie]: movieArtist, movie
        * [podcast]: podcastAuthor, podcast
        * [music]: musicArtist, musicTrack, album, musicVideo, mix, song
        * [musicVideo]: musicArtist, musicVideo
        * [audiobook]: audiobookAuthor, audiobook
        * [shortFilm]: shortFilmArtist, shortFilm
        * [tvShow]: tvEpisode, tvSeason
        * [software]: software, iPadSoftware, macSoftware
        * [ebook]: ebook
        * [all]: movie, album, allArtist, podcast, musicVideo, mix, audiobook, tvSeason, allTrack

### Response schema

The schema of response depends whether the response has succeeded or failed.

  * Success Response: 
    ```javascript
      {
        error: false,
        data: {
          resultCount: 50,
          results: [{},{},{},...]
        }
      }
    ```

  * Error Response:
    ```javascript
      {
        error: true,
        exception: {}
      }
    ```

## Tests

The server codebase has unit tests for routes, API requests and responses and for the utilites and services.

All tests are stored in [Test Directory](server/tests) and run via __Jest__ using `npm test`.

---

## Frontend

The project also has a frontend part that uses React as view library, Redux as state container and Webpack as module bundler.

> Webpack setup is implicitly handled by _create-react-app_.

### Run

To start the client application, you could easily run `npm start` in the __client__ directory. This will open a browser tab with the application running.

### Test

The client section uses __Jest__ as unit test library and __Enzyme__ as shallow renderer to test React components properly.

Test files are stored along each component's module.

  ```javascript
    client/src/components/Date
      > Date.js
      > Date.test.js
  ```

The setup for integrating Enzyme with the React codebase uses two separate files.

  * [raf-polyfill](client/src/raf-polyfill.js): Polyfills requestAnimationFrame for test environment.
  * [setupTests.js](client/src/setupTests.js): configures enzyme adapter for React v16.

  > For simplifying purposes, `React`, `Shallow`, `Mount` and `Render` are added to global scope in order not to import them in each test file.

### Redux architecture

The Redux setup has different sections:

  * [Action types and Action creators](client/src/actions): Each action file exports it's own types and action creators. They are divided into separate modules to namespace them by category. All of them are imported into [index.js](client/src/actions/index.js) to create a single source for components.

  * [Reducers](client/src/reducers): Each reducer as suggested by Redux is in it's own file and all of them are combined using `combineReducer` from Redux into [index.js](client/src/reducers/index.js).

  * [store.js](client/src/store.js): The store configuration

  > NOTE: Client uses redux-thunk for handling async actions in Redux.

### Styles

The setup uses SCSS as it's CSS preprocessor to ease styling procedure.

It also uses bootstrap v4 as a base framework for prototyping.

All SCSS files are compiled into [index.css](client/src/styles/index.css).

### Components

All components, no matter presentational or stateful, are stored in [Components Directory](client/src/components).

The main gateway of application is `<App />` component which loads a tabula layout in which relevant containers are loaded.

The `<List />` component is responsible for loading a collection of data and handles different states of a list (loading, empty, ...).

All errors are caught by `<Notification />` component which reads messaged directly from [`message` reducer](client/src/reducers/message.js).

All loading states are also defined in [`loading` reducer](client/src/reducers/loading.js).

### Linting

The project uses __ESLint__ with __airbnb__ standard alongside __eslint-prettier__ plugin for linting Javscript files.

### Formatting

The project uses __prettier__ to format all files in order to preserve consistency in team development.

---
---

# Run the project

To run the project, go through following steps:

* Clone the project from [https://github.com/farskid/itunes-proxy.git](https://github.com/farskid/itunes-proxy.git) by running `git clone https://github.com/farskid/itunes-proxy.git`.

* Install modules by running `npm install` in both __clients__ and __server__ directory.

* To run API server:

  * Change environment constants in [.env](server/.env) using the [sample file](server/sample.env).

  * Change any custom constants in [constants.js](server/constants.js).

  * Start Redis server with default config file in __/usr/local/etc/redis.conf__ by running `npm run start-cache`.

  * Start development server by `npm run start-dev-server`.

  * Start production server by `npm start`.

* To run Client application:

  * Run `npm start` and it will popup a browser tab with your application.
