const user = require("../database/tables/userList")

const register = async (req, res) => {
    const { username, lastname, email, password } = req.body;

    // check if use already exists
    const userExists = await user.findOne({
        where: {
            email: email
        },
    });

    if (userExists) {
        const error = new Error("This email is already registered");
        error.statucCode = 409;
        throw error;
    }
};



module.exports = register;