var userModel = require("../model/userModel");
var bcrpyt = require("bcrypt");
var jwt = require('jsonwebtoken')


class UserController {
    static addNormalUser(req,res){
        let saltRounds = 5;
        bcrpyt.hash(req.body.password, saltRounds, (err,hash)=>{
            if(err){
                res
                .status(500)
                .json({
                    msg: "failed to bcrypt"
                });
            }else{
                userModel.create({
                    username : req.body.username,
                    email : req.body.email,
                    password: hash
                },(err,data)=>{
                    if(err){
                        res
                        .status(500)
                        .json(err)
                    }else{
                        res
                        .status(200)
                        .json(data)
                    }
                })
            }
        })
    }

    static addAdminUser(req,res){
        let saltRounds = 5;
        bcrpyt.hash(req.body.password, saltRounds, (err,hash)=>{
            if(err){
                res
                .status(500)
                .json(err);
            }else{
                userModel.create({
                    username : req.body.username,
                    email : req.body.email,
                    password: hash,
                    isAdmin: true
                },(err,data)=>{
                    if(err){
                        res
                        .status(500)
                        .json(err);
                    }else{
                        res
                        .json(data);
                    }
                })
            }
        })
    }

    static signIn(req,res){
        userModel.findOne({username : req.body.username},(err,data)=>{
            if(err){
                res
                .status(500)
                .json(err)
            }else{
                if(data !== null){
                    // console.log(data)
                    let hash = data.password;
                    let password = req.body.password;
                    bcrpyt.compare(password,hash,(err,same)=>{
                        if(same){
                            jwt.sign({
                                username : data.username,
                                isAdmin: data.isAdmin,
                                email: data.email
                            },"secret",(err,token)=>{
                                if(err){
                                    res
                                    .status(500)
                                    .json(err)
                                }else{
                                    res
                                    .json({
                                        token,
                                        admin: data.isAdmin
                                    })
                                }
                            })
                        }else{
                            res
                            .status(401)
                            .json({
                                msg: "wrong password"
                            })
                        }
                    })
                }else{
                    res
                    .status(401)
                    .json({
                        msg: "user does not exist"
                    })
                }
            }
        })
    }

}


module.exports = UserController
