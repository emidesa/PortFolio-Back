const express = require('express'); // Framework pour gérer les routes et le middleware
const app = express();
const bdd = require('./bdd');
const bcrypt = require("bcrypt");
const cors = require('cors'); // gère les requêtes de différentes origines

app.use(cors());
app.use(express.json());
app.use("/assets", express.static("assets"));

const messageRoute = require ('./Routes/messageRoute');
const presentationRoute = require ('./Routes/presentationRoute');
const parcoursRoute = require ('./Routes/parcoursRoute');
const projetRoute = require ('./Routes/projetRoute');
const skillsRoute = require ('./Routes/skillsRoute');

app.use('/', messageRoute);
app.use('/', presentationRoute);
app.use('/', parcoursRoute);
app.use('/', projetRoute);
app.use('/', skillsRoute);


app.listen(3000, () => {
    console.log("je suis sur le port 3000");
});