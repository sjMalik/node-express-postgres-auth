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

