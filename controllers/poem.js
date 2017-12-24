const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "",
    database: process.env.DB || "ddlcforum"
});

exports.getPoem = function(req, res){
    db.query(
        `SELECT poems.*, poets.username FROM poems INNER JOIN poets ON poems.authorId = poets.id WHERE poems.id = ${req.params.id}`,
        (err, result)=>{
            if(err){
                console.log(err);
                res.render("poem");
            }else {
                db.query(`SELECT * FROM comments WHERE comments.poemId = ${req.params.id}`, (err, comments)=>{
                    console.log(comments);
                    res.render("poem", {poem: result[0], comments});
                });
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
        res.redirect("/forum");
    });
}

exports.createComment = function(req, res){
    var commentBody = req.body.body;
    var poemId = req.body.id
    var author = req.session.user.username;

    db.query(`INSERT INTO comments (poemId, author, body) VALUES ("${poemId}", "${author}", "${commentBody}")`, (err, result)=>{
        if(err){
            console.log("error: ", err);
            res.status(500).send(err);
        }
        console.log("success: ", result);
            res.json({author, body: commentBody, id: result.insertId});
    });
}

exports.likePoem = function(req, res){
    if (!req.session.user) return res.send(false);
    var poemId = req.params.id;
    db.query(`SELECT * FROM likes_dislikes WHERE userId =${req.session.user.id} AND poemId = ${req.params.id}`, (err, result)=>{
        if(result[0]){
            res.send(false);
        }else{
            db.query(`UPDATE poems SET likes = likes + 1 WHERE id = ${poemId}`, (err, result)=>{
                if(err){
                    res.send(false);
                    return;
                }
                res.send(true);
                db.query(`INSERT INTO likes_dislikes (userId, poemId, status) VALUES (${req.session.user.id}, ${req.params.id}, 1)`, (err, result)=>{
                    if(err) console.log(err);
                });
            });
        }
    });
    
}

exports.dislikePoem = function(req, res){
    if (!req.session.user) return res.send(false);
    var poemId = req.params.id;
    db.query(`SELECT * FROM likes_dislikes WHERE userId = ${req.session.user.id} AND poemId = ${req.params.id}`, (err, result)=>{
        if(result[0]){
            res.send(false);
        }else {
            db.query(`UPDATE poems SET dislikes = dislikes + 1 WHERE id = ${poemId}`, (err, result)=>{
                if(err){
                    res.send(false);
                    return;
                }
                res.send(true);
                db.query(`INSERT INTO likes_dislikes (userId, poemId, status) VALUES (${req.session.user.id}, ${req.params.id}, 0)`,(err, result)=>{
                    if(err) console.log(err);
                });
            })
        }
    });
}

module.exports = exports;