const { Shopping } = require('../models');

class ShoppingController {
    static async getAllShopping(req, res) {
        try {
            const all = await Shopping.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            res.status(200).json(all);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async getShoppingById(req, res) {
        const id = req.params.id
        try {
            const found = await Shopping.findOne({
                where: {
                    id
                }
            })
            if (found) {
                res.status(200).json(found)
            } else {
                res.status(404).json(
                    { msg: "Shopping not Found" }
                )
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async createNewShopping(req, res) {
        const { name } = req.body;
        try {
            const shop = await Shopping.create({
                name
            })
            res.status(201).json(shop);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    static async deleteShopping(req, res) {
        const id = req.params.id;
        try {
            const result = await Shopping.destroy({
                where: { id }
            })
            res.status(200).json({
                result,
                msg: "Shopping Deleted"
            })
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    static async editShopping(req, res) {
        const id = req.params.id;
        const { name } = req.body;
        try {
            const update = await Shopping.update({ name },
                {
                    where: { id }
                })
            res.status(200).json({
                update,
                msg: "Shopping Updated"
            })
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
module.exports = ShoppingController;
