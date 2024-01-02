//
let appName    = "[WEB API DEMO - CHAT]";
//
let appVersion = "1.0.0.1";
//
let chatPortNumber = 3000;
//
const express = require('express');
const app = express();
const http = require('http').Server(app);
//const cors = require('cors');
//const io   = require('socket.io')(http);
const io   = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
      credentials: true,
  }
});

//---------------------------------------------------
// Handling GET requests for different endpoints
//---------------------------------------------------
//
/*
app.use(cors({
  origin: 'http://localhost:4200', // Specific allowed origin
  credentials: false,                      
}));*/


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your client's origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify allowed methods
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  //res.header('Access-Control-Allow-Credentials', 'false'); // Allow credentials
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Specify allowed headers
  //res.header('Access-Control-Allow-Headers', '*'); // Specify allowed headers
  next();
});

/*
app.use(
  cors({
    origin: "*",
  }),
);
*/
//
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins for testing
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});*/

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages from the client
  /*
  socket.on("chat message", (msg) => {
    console.log("Message:", msg);
    io.emit("chat message", msg); // Broadcast message to all clients
  });
  */
  socket.on("message", (msg) => {
    console.log("Message:", msg);
    //io.emit("chat message", msg); // Broadcast message to all clients
    io.emit("message", msg); // Broadcast message to all clients
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

//---------------------------------------------------
// DRIVER CODE
//---------------------------------------------------
//
http.listen(chatPortNumber, () => {
  console.log("Server listening on port " + chatPortNumber);
});

