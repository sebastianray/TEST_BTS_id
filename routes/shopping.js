const { Router } = require('express');
const router = Router();
const ShoppingController = require('../controllers/shopping');
const { authorization } = require('../middlewares/auth');

router.get('/', authorization, ShoppingController.getAllShopping)
router.get('/:id', authorization, ShoppingController.getShoppingById)
router.post('/create', authorization, ShoppingController.createNewShopping)
router.delete('/:id', authorization, ShoppingController.deleteShopping)
router.put('/:id', authorization, ShoppingController.editShopping)


module.exports = router;