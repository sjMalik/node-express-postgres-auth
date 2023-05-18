# Auth

Add form-based cookie authentication to a CRUD app with a users table.

View a Video Walkthrough of this checklist [here](https://www.youtube.com/watch?v=H7qkTzxk_0I&list=PLM_i0obccy3t3qe805JmyAz5Wnjy2OclO&index=1).

### We will have 3 types of users:
* Visitors - can only view the homepage
* Logged In User - can only view the their page
* Admin User - can view any page; can de-activate users;

## Authentication
* Add auth router
* Create user with POST /auth/signup
	* validate required fields
	```
		typeof user.email == 'string' && user.email.trim() !== ''
	```
	* Check if email is unique
		- Check the database if it exist or not
	* hash password with bcrypt
	 	- Password is hashed in the database using a slow-hashing algorithm
		```
		bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
			// Store hash in your password DB.
		});
		```
		- Higher the saltRounds number, gives more secure password and it becomes safe from bruteforce attack and it takes more time to generate the hash
		- Reference: https://www.npmjs.com/package/bcrypt
	* insert into db
* Login user with POST /auth/login
	* check if email in db
		* compare password with hashed password in db
		```
		const isSame = await bcrypt.compare(password, hash);
		if(isSame) {}else{};
		```
		* Set a cookie with user_id after creating user
			* Express `res.cookie(name, value [, options])`
				```
				function setUserIdCookie(req, res, id){
					const isSecure = req.app.get('env') != 'development';
					res.cookie('user_id', id, {
						httpOnly: true,
						secure: isSecure,
						signed: true
					})
				}
				```
				- httpOnly	- 	Boolean	Flags the cookie to be accessible only by the web server.
				- secure 	- 	Boolean	Marks the cookie to be used with HTTPS only.
				- signed	-	Boolean	Indicates if the cookie should be signed.
				- in app.js
				Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
				```
				app.use(cookieParser(process.env.COOKIE_SECRET));
				```
			* Best Practices
			* Cross origin cookie!
* Create login form; show errors; redirect;
 	* validate required fields
* Create sign up form; show errors; redirect;
	* Validate required fields

### Authorization:
* Visitors can only see the homepage
	* isLoggedIn middleware
		* user_id cookie must be set
		* send an unauthorized error message
	* redirect to login form
* Logged in users can only see their page
	* allowAccess middleware
		* id in url must match user_id in cookie
 		* send an unauthorized error message
	* redirect to user page if they visit the homepage
		* set user_id in localStorage after login/signup
* Add GET /auth/logout to clear user_id cookie
	* redirect to login page

## Admin Page:
* Admin page that lists all users
	* admin table with user_id (unique constraint)
	* de-activate users
* Admin can see any page on site

## Other ways to auth:
* Use sessions instead of cookies!
* Use JWTs instead of sessions!