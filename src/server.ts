import express from 'express';
import mongoose from 'mongoose';
import routes from "./routes/routes"

const app = express();
const port = process.env.PORT || 3000;

const atlasMongodbConection = 'mongodb+srv://erick:tractianerick@cluster0.ykzetjp.mongodb.net/?retryWrites=true&w=majority';

/*Caso opte por rodar via docker e utilizar o banco 
    localmente utilizar a variavel abaixo */
const localDockerMongodbConection = 'mongodb://test:test-password@mongodb:27017/?authMechanism=DEFAULT';

mongoose.connect(atlasMongodbConection);

app.use(express.json()); 
app.use(routes)

app.listen(port , () => {
    console.log("Server listening");
});