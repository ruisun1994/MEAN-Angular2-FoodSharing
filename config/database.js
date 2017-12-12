const crypto =require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://localhost:27017/6150final', //database uri and database name
    secret: crypto, //Cryto-created secret
    db: '6150final' //database name
}