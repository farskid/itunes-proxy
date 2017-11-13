const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
  console.log(req.query);

  res.status(200).json({
    error: false,
    message: 'ok'
  });
});

module.exports = router;
