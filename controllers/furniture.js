const { response } = require('express');
require('dotenv').config();
const Furniture = require('../models/Furniture');

const getFurnitureList = async (req, res = response) => {

    try {
        const furnitureList = await Furniture.find();
        if (!furnitureList) {
            return res.status(404).json({
                ok: false,
                message: 'Fallo al obtener los muebles de la base de datos'
            });
        };

        return res.status(200).json({
            ok: true,
            message: 'Obtención exitosa de los muebles de la base de datos',
            furnitureList
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contacte con el administrador'
        });
    };

};

const addFurniture = async (req, res = response) => {

    const { name } = req.body;
    const password = req.header('x-password');

    if (password !== process.env.PASSWORD_ADMIN) {
        return res.status(401).json({
            ok: false,
            message: 'No tiene privilegios para modificar la base de datos'
        });
    }

    try {
        let furniture = await Furniture.findOne({ name });
        if (furniture) {
            return res.status(400).json({
                ok: false,
                message: 'Ya existe un mueble con ese nombre'
            });
        };

        furniture = new Furniture(req.body);

        await furniture.save();

        return res.status(201).json({
            ok: true,
            message: 'Mueble añadido correctamente',
            furniture
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contacte con el administrador'
        });
    };
}

module.exports = {
    getFurnitureList,
    addFurniture
}