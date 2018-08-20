var jwt = require('jsonwebtoken');

function verifyAdmin (req,res,next){
    const token = req.headers.token;
    if(typeof token !== undefined) {
        jwt.verify(token, 'secret', function(err, decoded) {
            if(err){
                console.log(err);
            }else{
                if(decoded.isAdmin == true){
                    next();
                }else{
                    res.status(401).json({
                        msg: "you must be an admin"
                    })
                }
            }
          });
    }else{
        res.status(403).json({
            err: "you must be logged in"
        })
    }
}


function isAdmin(req,res){
    // res.send("alive")
    let token = req.headers.token;
    jwt.verify(token,"secret",(err,decoded)=>{
        if(err){
            res.json(500)
        }else{
            if(decoded){
                res
                .status(200)
                .json(true)
            }else{
                res
                .status(401)
                .json({
                    msg: "you are not admin"
                })
            }
        }
    })
}


function verifyToken(req,res,next){
    const token = req.headers.token;
    if(typeof token !== undefined && token !== null) {
        jwt.verify(token, 'secret', function(err, decoded) {
            if(err){
                console.log(err);
            }else{
                if(decoded){
                    next();
                }else{
                    res.status(500).json({
                        msg: "internal service err"
                    })
                }
            }
          });
    }else{
        res.status(403).json({
            err: "you must be logged in to purchase"
        })
    }
}

module.exports = {
    verifyToken,
    verifyAdmin,
    isAdmin

}