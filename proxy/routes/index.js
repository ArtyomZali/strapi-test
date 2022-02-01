var express = require('express');
var axios = require('axios');
var router = express.Router();
const qs = require('qs');

router.get('/routes', async function (req, res, next) {
  let routes = await axios
    .get("http://localhost:1337/api/routes")
    .then((resp) => resp.data.data);
  return res.json(routes);
});

router.get('/menu-items', async function (req, res, next) {
  const query = qs.stringify({
    populate: {
      dropdown_columns: {
        populate: '*',
      },
    },
  }, {
    encodeValuesOnly: true,
  });
  let menuItems = await axios
    .get(`http://localhost:1337/api/menu-items?${query}`)
    .then((resp) => resp.data.data);
  return res.json(menuItems);
});

router.get('/footer-items', async function (req, res, next) {
  let footerItems = await axios
    .get("http://localhost:1337/api/footer-items")
    .then((resp) => resp.data.data);
  return res.json(footerItems);
});

module.exports = router;
