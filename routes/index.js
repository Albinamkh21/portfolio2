const express = require('express');
const router = express.Router();
let contentData = require('../content.json');

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
  res.render('pages/works', obj);
});

router.get('/blog', function (req, res) {
    let obj = {
        title: 'Блог',
        blogArticles : contentData.blogArticles
    };
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/blog', obj);
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