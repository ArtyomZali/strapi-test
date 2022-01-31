var express = require('express');
var axios = require('axios');
var router = express.Router();
router.get('/routes', async function (req, res, next) {
  let routes = await axios
    .get("http://localhost:1337/api/routes")
    .then((resp) => resp.data.data);
  return res.json(routes);
});

module.exports = router;
