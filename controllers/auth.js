const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const newUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let newUser = await User.findOne({ email });
        if (newUser) {
            return res.status(400).json({
                ok: false,
                message: 'Ya existe una cuenta con ese correo'
            })
        }

        newUser = new User(req.body);
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);
        await newUser.save();

        return res.status(201).json({
            ok: true,
            message: 'Cuenta creada correctamente',
            user: {
                name: newUser.name,
                email: newUser.email,
                basketList: []
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contacte con el administrador'
        });
    }
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'No existe ningún usuario con ese correo'
            });
        };

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Contraseña incorrecta'
            });
        };

        return res.status(200).json({
            ok: true,
            message: 'Inicio de sesión exitoso',
            user: {
                name: user.name,
                email: user.email,
                basketList: user.basketList
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contacte con el administrador'
        });
    }


}

module.exports = {
    newUser,
    loginUser
}