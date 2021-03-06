# OUR SITE IS DEPLOYED NOW
Check us out at:
https://our-anime-list-beta.herokuapp.com

# IMPORTANT: make sure you're not on UCLA_WEB when working with the app; the database won't connect properly. 

# Getting started
- After you clone the git repo, use `npm install`. If this doesn't work, use npm install --save. 
- Perform npm install both in the client directory and the server directory as well. 
- Create a file in server/ called config.env
- Email Jeffrey Kwan (jkwan314@g.ucla.edu) for what to put in the config.env file. This is for security reasons. 
- Navigate to the server directory.
- `npm start`
    This turns on the back end.
- Navigate to the client directory.
- `npm start`
    This turns on the front end.
Open http://localhost:3000 to view it in your browser!

# Developers:
- Chancellor Richey
- Margaret Capetz
- Jeffrey Kwan

## Getting access to the database
- Make a MongoDB account and I'll add you to it

## Interacting with the database from frontend
- Add a route in /server/routes/record.js
- https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial
- In the page you want to call the db endpoint, import axios at the top of your page:
  - import axios from 'axios';
- do smt like this 
  ```
   async function getRecords() {
     const response = await axios.get("/listings");
     const json = await response.data;
     console.log(json);
     setRecords(json);
   }
## Key points:
- wrap the axios get/post/delete whatever request inside an async function
- use [path name you specified earlier] as the url
- put "await" in front of the axios fetch and response
