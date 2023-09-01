const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

/* Connecting to the database and then starting the server. */
mongoose
  .connect(
    "mongodb+srv://shivamkumarit2019:U45XDFsFkDlk126C@cluster0.ixt4xbs.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, console.log("Server started on port 5000"));
  })
  .catch((err) => {
    console.log(err);
  });

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://shivamkumarit2019:U45XDFsFkDlk126C@cluster0.ixt4xbs.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const fs = require('fs');

// const credentials = '<path_to_certificate>'

// const client = new MongoClient('mongodb+srv://cluster0.ixt4xbs.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
//   sslKey: credentials,
//   sslCert: credentials,
//   serverApi: ServerApiVersion.v1
// });

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("testDB");
//     const collection = database.collection("testCol");
//     const docCount = await collection.countDocuments({});
//     console.log(docCount);
//     // perform actions using client
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);
