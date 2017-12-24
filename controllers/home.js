const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "",
    database: process.env.DB || "ddlcforum"
});

exports.index = function(req, res){
    //session auth
    if(req.session.isLoggedIn) res.redirect("/forum");

    //check for form errors
    var err;
    switch(req.query.err){
        case '1':
            err = "Incorrect username or password.";
            break;
        case '2':
            err = "Username taken.";
            break;
    }
    res.render("index.ejs", {err});
}

exports.forum = function(req, res){
    if(!req.session.isLoggedIn) res.redirect("/");
    db.query("SELECT poems.*, poets.username FROM poems INNER JOIN poets ON poems.authorId = poets.id ORDER BY datePosted DESC", (err, result)=>{
        var poems;
        var lastPage = Math.ceil(result.length / 5);
        var currentPage = req.query.page || 1

        if(!req.query.page || req.query.page == 1){
            poems = result.splice(0, 5);
        }else {
            var start = 5 * (req.query.page - 1);
            poems = result.splice(start, 5);
        }

        pagination = {currentPage, firstPage: 1, lastPage}
        res.render('forum', {user: req.session.user, newPoems: poems, pagination});
    });
}

module.exports = exports;