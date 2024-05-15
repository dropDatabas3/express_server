import userManager from "../data/mongo/manager/UserManager.mongo.js";

async function isValidPassword(req, res, next){
    try {
        const { email, password } = req.body
        const one = await userManager.readByEmail(email)
        if(one.password !== password){
            const error = new Error ("bad auth from login")
            error.statusCode = 401
            throw error
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export default isValidPassword