var jwt = require('jsonwebtoken');
function createtoken (payload) {
    return  jwt.sign(payload, process.env.jwtPassword, {expiresIn: "24h"});
}
module.exports=createtoken