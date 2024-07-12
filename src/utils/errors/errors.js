const errors = {
    error: { message: "Error", statusCode: 400 },
    emailAlreadyExists: { message: "This email is registered", statusCode: 400 },
    invalid: { message: "Invalid credentials", statusCode: 400 },
    missing: { message: "Missing fields, please enter all required inputs", statusCode: 400 },
    badRequest: { message: "Bad request", statusCode: 400 },
    notVerified: { message: "Email not verified", statusCode: 401 },
    auth: { message: "Bad auth", statusCode: 401 },
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "Not found", statusCode: 404 },
    fatal: { message: "Fatal", statusCode: 500 },
   };
   
export default errors;