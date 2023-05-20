module.exports.isLoggedIn = function (req, res, next) {
    if(req.signedCookies.user_id){
        next()
    }else{
        res.status(401);
        next(new Error('Un-Authorized'))
    }
},

module.exports.allowAccess = function(req, res, next) {
    if(req.signedCookies.user_id === req.params.id) {
        next();
    }else{
        res.status(401);
        next(new Error('Un-Authorized'))
    }
}