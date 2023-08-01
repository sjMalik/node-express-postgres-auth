1. Generate Express app with view = handlebar
    - express --view=hbs .
2. Knex migration
    - npm i knex pg
    - knex init
    - knex migrate:make <migration-name>
    - knex migrate:latest; knex seed:run;
    - knex migrate:rollback                     // Drop the tables
3. Run the server
    - cd server
    - npm start
4. Run the client app
    - cd client
    - npx http-server

5. Add Swagger
    - npm i swagger-ui-express yamljs
    - In app.js
        ```
        const swaggerUI = require('swagger-ui-express');
        const YAML = require('yamljs');
        const swaggerJsDocs = YAML.load("./src/api.yaml");

        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
        ```
    - Create a `api.yaml` file
        ```
        openapi: 3.0.0
        info:
            title: Express Typescript API
            description: Typescript CRUD Apis
            version: 1.0
            contact:
                email: surajit94malik@gmail.com
            liscence:
                name: Test
                url: test.com
        servers:
            -   url: http://localhost:5000
                description: This is my local server
            -   url: http://example.com
                description: This is production url

        paths:
        #Returns list of todos
        /api/v1/todos:
            get:
            summary: Get List of Todos
            description: Respond with array of todos
            responses:
                200:
                description: Successful Response
                schema:
                    $ref: "#/components/schemas/Todo"
                400:
                description: Bad Request
            post:
            summmary: Create a new Todo
            description: Repsond with a new todo
            parameters:
                - in: body
                name: body
                schema:
                    type: object
                    required:
                    - content
                    - done
                    properties:
                    content:
                        type: string
                    done:
                        type: boolean
            responses:
                200:
                description: Successful Response
                schema:
                    $ref: "#/components/schemas/Todo"
        
        components:
            schemas:
                Todo:
                type: object
                required:
                    - content
                properties:
                    _id:
                    type: string
                    content:
                    type: string
                    done:
                    type: boolean
        ```

### Authentication and Authorization
 * Authenticate and authorize users in a server-side application
 * Users can sign up for to the app with a unique email
 * Users cannot sign up for to the app with a duplicate email
 * Users can login to the app with valid email/password
 * Users cannot login to the app with a blank or missing email
 * Users cannot login to the app with a blank or incorrect password
 * There is a resource that can only be seen by logged in users
 * There is a resource that can only be seen by a specific user
 * There is a resource that has some links and content that only appears when * logged in / for certain users
### Harden a server-side application against security vulnerabilities
 * Password is hashed in the database using a slow-hashing algorithm
 * Cookies are HTTPOnly
 * Cookies are Secure
 * Cookies are encrypted
 * Encryption keys are set in environment variables

