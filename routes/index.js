const express = require('express');
const router = express.Router();
let contentData = require('../content.json');
const mongoose = require('mongoose');


router.get('/', function (req, res) {
  let obj = {
    title: 'Главная страница'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/welcome', obj);
});

router.get('/works', function (req, res) {
  let obj = {
    title: 'Мои работы'
  };
  Object.assign(obj, req.app.locals.settings);
    const Model = mongoose.model('work');
    Model
        .find()
        .then(items => {
           Object.assign(obj, {works: items});
            res.render('pages/works', obj);
        });
});

router.get('/blog', function (req, res) {
    let obj = {
        title: 'Блог'

    };
    Object.assign(obj, req.app.locals.settings);
    const Model = mongoose.model('blog');
    //получаем список записей в блоге из базы
    Model
        .find()
        .then(items => {
            // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
            // записей в блоге
            Object.assign(obj, {articles: items});
            res.render('pages/blog', obj);
        });
});


router.get('/about', function (req, res) {
    let obj = {
        title: 'Обо мне',
        skills: contentData.skills
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/about', obj);
});



module.exports = router;