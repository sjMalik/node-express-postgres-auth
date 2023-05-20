var express = require('express');
var router = express.Router();

const User = require('../db/user');
const {allowAccess} = require('../auth/middleware');

router.get('/:id', allowAccess, async function(req, res, next) {
  try {
    const users = await User.getOne(req.params.id);
    res.json({
      user: users[0]
    })
  }catch(e){
    next(e)
  }
});

module.exports = router;
