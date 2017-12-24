const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session");

app.use(session({
    secret: "u809fj98a23",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'))

app.set("view engine", 'ejs');


const routes = require("./routes");

app.use("/", routes);

app.listen(process.env.PORT || 8080, console.log("app on 8080"));