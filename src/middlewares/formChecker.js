function checkProductsInputs( req , res , next){
    try {
        const { title , category , price , stock } = req.body
        if( title && category && price && stock){
            return next()
        }else{
            let error = new Error("Faltan campos")
            error.statusCode = 400
            throw error
        }
    } catch (error) {
        next(error)
    }
}
export default checkProductsInputs;

