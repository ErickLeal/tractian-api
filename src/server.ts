import express from 'express';
import mongoose from 'mongoose';
import routes from "./routes/routes"

const app = express();

mongoose.connect('mongodb://test:test-password@mongodb:27017/?authMechanism=DEFAULT');

app.use(express.json()); 
app.use(routes)

app.listen(3000 , () => {
    console.log("Server listening");
});