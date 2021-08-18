function verifyToken(req, res, next){
    //Get request cookie value
    const cookieToken = req.cookies.ahyensew

    //check if cookie is not undefined
    if(typeof cookieToken !== 'undefined'){
        req.params = {...req.params, token: cookieToken};
        next();
    }else {
        //Forbidden
        res.status(403).send()
    }
}

module.exports = verifyToken;