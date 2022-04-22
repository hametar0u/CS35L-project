# IMPORTANT: make sure you're not on UCLA_WEB when working with the app; the database won't connect properly. 

# Getting started
- perform npm install both in the client directory and the server directory
- create a file in server/ called config.env
- DM me for what to put there (idk if it works just yet but we need to test it)
- navigate to the server directory
- npm start
    This turns on the back end.
- navigate to the client directory
- npm start
    This turns on the front end
Open http://localhost:3000 to view it in your browser

# Getting access to the database
- Make a MongoDB account and I'll add you to it

# Interacting with the database from frontend
- Add a route in /server/routes/record.js
- https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial
- In the page you want to call the db endpoint, import axios at the top of your page:
  - import axios from 'axios';
- do smt like this 
  async function getRecords() {
     const response = await axios.get("/listings");
     const json = await response.data;
     console.log(json);
     setRecords(json);
   }
## key points:
- wrap the axios get/post/delete whatever request inside an async function
- use [path name you specified earlier] as the url
- put "await" in front of the axios fetch and response


# TODO: sessions, auth

# ISSUES:
- my create button adds entry to db properly, but for some reason its throwing a 400 error