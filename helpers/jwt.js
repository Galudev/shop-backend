const jwt = require('jsonwebtoken');

const generarJWT = (email) => {

    return new Promise((resolve, reject) => {
        const payload = { email };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token');
            }

            resolve(token);
        })
    })

}

module.exports = {
    generarJWT
}