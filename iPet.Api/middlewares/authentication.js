const jwt = require('jsonwebtoken');
const variebles = require('../bin/configuration/variables');

module.exports = async (req, res, next) => {
    let token = req.body.token || req.query.query || req.headers['x-access-token'];
    if(token){
        try {
            let decoded = await jwt.verify(token, variebles.Security.secretKey);
            console.log(decoded);
            req.usuarioLogado = decoded;
            next();
        } catch (error) {
            console.log(error);
            res.status(400).send({message: 'Token invalido'});
            return;
        }
    } else {        
        res.status(401).send({message: 'Voce precisa informar um token para acessar este recurso'});
        return;
    }
}