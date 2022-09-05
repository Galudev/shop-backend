const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');

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

        const token = await generarJWT(newUser.name, newUser.email);

        return res.status(201).json({
            ok: true,
            message: 'Cuenta creada correctamente',
            user: {
                name: newUser.name,
                email: newUser.email,
                basketList: []
            },
            token
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

        const token = await generarJWT(user.name, user.email);

        return res.status(200).json({
            ok: true,
            message: 'Inicio de sesión exitoso',
            user: {
                name: user.name,
                email: user.email,
                basketList: user.basketList
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contacte con el administrador'
        });
    }
}

const revalidarToken = async (req, res = response) => {

    const { name, email } = req;

    // Generar JWT
    const token = await generarJWT(name, email);

    res.json({
        ok: true,
        message: 'Token renovado correctamente',
        name,
        email,
        token
    });
}

module.exports = {
    newUser,
    loginUser,
    revalidarToken
}