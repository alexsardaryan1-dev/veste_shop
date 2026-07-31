// We create this JWT utility file which creates and verifies JSON Web Tokens (JWT).
// JWT is commonly used for authentication.
// The idea:
// User logs in.
// Backend creates a token.
// Browser stores the token (usually in a cookie).
// Later, the user makes requests.
// Backend checks the token to know who the user is.

import jwt from "jsonwebtoken";

// here we import the library which gives us two important functions: jwt.sign() - creates a token, jwt.verify() - checks if a token is valid.

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

// the ID is usually the user's database ID. 
// so when we create a token with sign(), it needs 3 things: payload, secret, options.
// payload is the datat we want to store inside the token: {id};
// secret key is the secret key used to sign the token, so it's like backend creates: user data + secret key -> JWT token, only backend knows the secret key;
// options - here it can define token settings, 

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

// it checks if the token is real and created by my backend. For example, user sends request: GET/api/profile, browser sends: cookie: token=eyJhbGciOiJI...
// backend receives: verifyToken(token)

// JWT checks:
// - Is the token modified?
// - Was it created using my secret?
// - Has it expired?