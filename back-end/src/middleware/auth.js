const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = {
    eAdmin: async function (req, res, next) {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(400).json({
                erro: false,
                mensagem: "Token não existe!"
            })
        }

        const [bearer, token] = authHeader.split(' ');

        if (!token) {
            return res.status(400).json({
                erro: false,
                mensagem: "Token não existe!"
            })
        }

        try {
            const decode = await promisify(jwt.verify)(token, "D2DDJSUD726390S8DDSDADWD465G");
            req.userId = decode.id;
            return next();
        } catch (err) {
            return res.status(400).json({
                erro: false,
                mensagem: "Token inválido!"
            })
        }
    }
}