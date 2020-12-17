const { Router } = require('express');
const router = Router();
const userRoutes = require('./user');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "This is home page of BookRoom"
    })
});

router.use('/user', userRoutes);

module.exports = router;