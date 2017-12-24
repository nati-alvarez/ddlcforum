const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "",
    database: process.env.DB || "ddlcforum"
});
const bcrypt = require("bcrypt");
  
exports.signup = function(req, res){
    var password = bcrypt.hashSync(req.body.password, 10);
    db.query(`INSERT INTO poets (username, password) VALUES ('${req.body.username}', '${password}')`, (err, result)=>{
        if(err){
            console.log(err);
            if(err.sqlState === "23000") res.redirect("/?err=2");
            return;
        }
        req.session.user = {username: req.body.username, id: result.insertId};
        req.session.isLoggedIn = true;
        res.redirect("/forum");
    });
}

exports.login = function(req, res){
    db.query(`SELECT * from poets WHERE username = '${req.body.username}'`, (err, result)=>{
        if(err) console.log(err);
        if(!result[0]) {
            res.redirect("/?err=1");
        }else {
            var password = req.body.password;
            if(bcrypt.compareSync(password, result[0].password)){
                req.session.user = {username: req.body.username, id: result[0].id};
                req.session.isLoggedIn = true;
                res.redirect("/forum");
            }else{
                res.redirect("/?err=1");
            }
        }
    });
}

exports.logout = function(req, res){
    req.session.isLoggedIn = false;
    req.session.user = null;
    res.redirect("/");
}

module.exports = exports;