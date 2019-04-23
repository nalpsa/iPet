const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://ipetadmin:ipet123456@ipet-hb0ix.mongodb.net/ipet?retryWrites=true'
    },
    Security: {
        secretKey: 'd41d8cd98f00b204e9800998ecf8427e|78ad33e1beb40bc2a7befe857f94de28'
    }
}
module.exports = variables;