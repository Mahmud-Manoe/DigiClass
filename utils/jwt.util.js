const jwt = require("jsonwebtoken");
const { uuid } = require('uuidv4')

exports.generateToken = async (payload) => {
    return await jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "60000s",
    });
};
// exports.deleteToken = async (token) => {
//     return await jwt.sign(token, "", {
//         expiresIn: "1s",
//     });
// };

exports.decodeToken = async (token) => {
    const decodedToken = await jwt.decode(token);

    return decodedToken;
};

exports.getRandomToken = () => {
    return uuid();
}

exports.makeCode = () => {
    let result = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 7) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

