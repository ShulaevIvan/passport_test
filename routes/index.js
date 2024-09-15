const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        res.status(200);
        res.render('index', {user: req.user});
    }
    catch(err) {
        console.log('err GET /');
        console.log(err);
    }
});

module.exports = router;