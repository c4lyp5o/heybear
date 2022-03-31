const express = require('express');
const router = express.Router();
const Cont = require('./controller');

router.get('/', Cont.theHome);
router.get('/messages', Cont.getMessage);
router.post('/messages', Cont.sendMessage);
    
module.exports = router;