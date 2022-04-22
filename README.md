# IMPORTANT: make sure you're not on UCLA_WEB when working with the app; the database won't connect properly. 

# Getting started

# Getting access to the database
- Make a MongoDB account and I'll add you to it

# Interacting with the database from frontend
- Add a route in /server/routes/record.js
- https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial
- In the page you want to call the db endpoint, import axios at the top of your page:
  - import axios from 'axios';
- do smt like this 
  async function getRecords() {
     const response = await axios.get(`http://localhost:5001/listings`);
     const json = await response.data;
     console.log(json);
     setRecords(json);
   }
- wrap the axios get/post/delete whatever request inside an async function
- use http://localhost:5001/[path name you specified earlier] as the url
- use an await


# Testing your stuff
- navigate to the server directory
- npm start
This turns on the back end.
- navigate to the client directory
- npm start
This turns on the front end
Open [http://localhost:3000](http://localhost:3000) to view it in your browser