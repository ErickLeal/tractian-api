import express from 'express';
import mongoose from 'mongoose';
import routes from "./routes/routes"

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://erick:tractianerick@cluster0.ykzetjp.mongodb.net/?retryWrites=true&w=majority');

app.use(express.json()); 
app.use(routes)

app.listen(port , () => {
    console.log("Server listening");
});