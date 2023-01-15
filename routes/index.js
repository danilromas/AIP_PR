var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/checkAuth.js')
var Legend = require("../models/legend").Legend
var User = require("../models/user").User

/* Домашняя страница */
router.get('/', function(req, res, next) {
    Legend.find({}, {_id: 0, title: 1, nick: 1}, function(err, menu) {
        req.session.greeting = "Hi!!!"
        res.render('index', {
            title: "Legend Boxes",
            picture: "images/legendbox.jpg",
            counter: req.session.counter
        });
    })
});

/* logreg */
router.get('/logreg', function(req, res, next) {
    res.render('logreg', {title: 'Вход', error: null});
});

/* post login/registration */
router.post('/logreg', function(req, res, next) {
    var username = req.body.username
    var password = req.body.password
    User.findOne({username: username}, function(err, user) {
        if(err) return next(err)
        if(user) {
            if(user.checkPassword(password)) {
                req.session.user = user._id
                res.redirect('/')
            } else {
                res.render('logreg', {title: 'Вход', error: "Пароль неверный"})
            }
        } else {
            var user = new User ({username: username, password: password})
            user.save(function(err, user) {
                if(err) return next(err)
                req.session.user = user._id
                res.redirect('/')
            })
        }
    })
});

/* post logout */
router.post('/logout', function(req, res, next) {
    req.session.destroy()
    res.locals.user = null
    res.redirect('/')
});

module.exports = router;
