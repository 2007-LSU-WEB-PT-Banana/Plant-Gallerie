require("dotenv").config();

// This is the Web Server
const express = require("express");
const server = express();
const cors = require("cors");

// create logs for everything
const morgan = require("morgan");
server.use(morgan("dev"));
server.unsubscribe(cors());
// handle application/json requests
const bodyParser = require("body-parser");
server.use(bodyParser.json());

// here's our static files
const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

// here's our API
server.use("/api", require("./routes"));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
server.use((err, req, res, next) => {
	console.log(err.status);
	res.status(err.status || 500).send({ message: err.message });
});
// bring in the DB connection
const { client } = require("./db");

// connect to the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
	try {
		await client.connect();
		console.log("Database is open for business!");
	} catch (error) {
		console.error("Database is closed for repairs!\n", error);
	}
});
