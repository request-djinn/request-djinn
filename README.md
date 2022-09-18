# Request-Djinn - Inspect and debug webhook requests!

A simple request inspector created with MongoDB, Express.js, React, Node.js & PostgreSQL

## Introduction & General Information

Webhooks can be vague or difficult to parse so Request-Djinn offers an easy way to inspect all HTTP requests sent to your very own endpoint! You can view the basic structure and request metadata, as well as data in the body. 

## Technologies

Express.js 4.18.1 (back-end server)

Mongoose (MongoDB ODM) 6.6.1

Node.js >= 6.9.0

React (front-end)

MongoDB and PostgreSQL (Databases to store bins and requests)

## Setup & Usage

#### Active State (online):

Simply visit https://www.request-djinn.com and click the "Create a Bin" button. You'll get a URL for your bin which you can send webhook requests to! You can now view all your requests and metadata at that URL. If you create multiple bins, you can click the "My Bins" button to see a list of your bins. 

![ss2](https://live.staticflickr.com/65535/52365611064_dcfc4a4db8_b.jpg)

![ss3](https://live.staticflickr.com/65535/52365611099_82d8ed3268_b.jpg)

![ss4](https://live.staticflickr.com/65535/52365722455_20291022b4_b.jpg)

#### Using locally:

Download the project to your system.

`cd djinn-backend` - Navigate to this folder to start the app.

`npm install` - Install all dependencies.

In the `server.js` file, on line 15, pass in your MongoDB URL as a string to the `mongoose.connect` method. If you've never made one, you can test the app by creating a "Shared" tier cluster for free on MongoDB's website and grab your database URL. For local use, please follow this guide to set up a MongoDB local connection: https://github.com/mongodb/homebrew-brew

To use PostgreSQL locally, be sure to replace the fields in the `relationalDb.js`file with your own, and create a database called `reqdjinn`. Then, navigate to the `schema.sql` file and simply copy and paste lines 3-10 to create your table. 

`npm start` - Start running Request-Djinn locally!

If you are having issues in between instances, please clear out the `localStorage` data in your browser and try again.

## Status

The project is currently active. Feel free to test it out and send us all your feedback!

## Future Improvements:

- Using the WebSocket API: This would allow us to automatically update a bin view page in real time as requests come in to improve user experience.

## License

This project is licensed under the terms of the GNU v3.0 License. You can view it here: https://github.com/request-djinn/request-djinn/blob/main/LICENSE

