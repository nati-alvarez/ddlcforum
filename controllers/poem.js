const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "san12nas",
    database: "poet_forum"
});

exports.getPoem = function(req, res){
    db.query(
        `SELECT poems.*, poets.username FROM poems INNER JOIN poets ON poems.authorId = poets.id WHERE poems.id = ${req.params.id}`,
        (err, result)=>{
            if(err){
                console.log(err);
                res.render("poem");
            }else {
                console.log(result[0].body);
                res.render("poem", {poem: result[0]});
            }
            
        }
    );   
}

exports.newPoem = function(req, res){
    if(!req.session.isLoggedIn) return res.redirect("/");
    res.render("newPoem");
}

exports.createPoem = function(req, res){
    var poemTitle = req.body.title;
    var poemBody = req.body.body;
    db.query(
        `INSERT INTO poems (title, body, authorId) VALUES("${poemTitle}", "${poemBody}", "${req.session.user.id}")`,
    function(err, result){
        if(err){
            console.log(err);
            return res.redirect("/poem/new?err=1");
        }
        console.log(result);
        res.redirect("/forum");
    });
}

module.exports = exports;