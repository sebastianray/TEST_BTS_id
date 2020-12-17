const { Router } = require('express');
const router = Router();
const userRoutes = require('./user');
const shoppingRoutes = require('./shopping');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "This is home page of Test_Backend = BTS.id"
    })
});

router.use('/user', userRoutes);
router.use('/shopping', shoppingRoutes);

module.exports = router;