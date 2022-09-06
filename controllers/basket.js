const { response } = require('express');
const User = require('../models/User');

const addItem = async (req, res = response) => {
    const id = req.params.id;
    const { email } = req;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Ese usuario no existe en la base de datos'
            });
        };

        user.basketList.push({
            id,
            count: 1
        });

        await user.save();

        return res.status(200).json({
            ok: true,
            message: 'Item añadido al carrito correctamente',
            basketList: user.basketList
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contacte con el administrador'
        });
    };
};

const removeItem = async (req, res = response) => {
    const id = req.params.id;
    const { email } = req;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Ese usuario no existe en la base de datos'
            });
        };

        user.basketList = user.basketList.filter(item => item.id !== id);

        const userUpdated = await User.findOneAndUpdate({ email }, user, { new: true })

        return res.status(200).json({
            ok: true,
            message: 'Item eliminado del carrito correctamente',
            basketList: userUpdated.basketList
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contacte con el administrador'
        });
    };
};

const updateItem = async (req, res = response) => {
    const { id, count } = req.body;
    const { email } = req;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Ese usuario no existe en la base de datos'
            });
        };

        let isFound = false;
        user.basketList.map((item) => {
            if (item.id === id) {
                isFound = true;
                item.count = count;
            };
            return item;
        });

        if (isFound) {
            const userUpdated = await User.findOneAndUpdate({ email }, user, { new: true })

            return res.status(200).json({
                ok: true,
                message: 'Item del carrito actualizado correctamente',
                basketList: userUpdated.basketList
            });
        } else {
            return res.status(400).json({
                ok: false,
                message: 'Ese item no se encuentra en el carrito del usuario'
            });
        };

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contacte con el administrador'
        });
    };
};

const deleteAll = async (req, res = response) => {
    const { email } = req;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Ese usuario no existe en la base de datos'
            });
        }

        user.basketList = []
        const userUpdated = await User.findOneAndUpdate({ email }, user, { new: true });

        return res.status(200).json({
            ok: true,
            message: 'Elementos eliminados del carrito correctamente',
            basketList: userUpdated.basketList
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contacte con el administrador'
        });
    };
}

module.exports = {
    addItem,
    removeItem,
    updateItem,
    deleteAll
}