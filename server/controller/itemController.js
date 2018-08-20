var itemModel = require("../model/itemModel");
var mongoose = require('mongoose');

class ItemController {
    static addItem(req,res){
        itemModel.create({
            name: req.body.name,
            price : `$ ${req.body.price}`,
            imageUrl : req.body.imageUrl,
            category : req.body.category
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

    static getAllItems(req,res){
        itemModel.find({},(err,data)=>{
            if(err){
                console.log(err);
                res
                .status(500)
                .json(err);
            }else{
                res
                .status(200)
                .json(data);
            }
        })
    }

    static getItemByCategory(req,res){
        itemModel.find({ category : req.body.category},(err,data) =>{
            if(err){
                res
                .status(500)
                .json(err)
            }else{
                res
                .json(data)
            }
        })
    }
    
    static deleteItem(req,res){
        itemModel.deleteOne({ _id : mongoose.Types.ObjectId( req.params.id )},(err,changes)=>{
            if(err || changes.n == 0){
                console.log(err);
                res
                .status(400)
                .json(err)
            }else{
                console.log(changes);
                itemModel.find({},(err, data)=>{
                    if(err){
                        res
                        .status(500)
                        .json(err)
                    }else{
                        res
                        .status(200)
                        .json(data)
                    }
                } )
            }
        })
    }

    static updateItem ( req, res ) {
        let updateObj = {
            name: req.body.name,
            price : `$ ${req.body.price}`,
            imageUrl : req.body.imageUrl,
            category : req.body.category
        }
        itemModel.updateOne({ _id : mongoose.Types.ObjectId( req.params.id )}, updateObj ,(err,changes)=>{
            if(err || changes.n == 0){
                console.log(err);
                res
                .status(400)
                .json(err)
            }else{
                console.log(changes);
                itemModel.find({},(err, data)=>{
                    if(err){
                        res
                        .status(500)
                        .json(err)
                    }else{
                        res
                        .status(200)
                        .json(data)
                    }
                } )
            }
        })
    }
}


module.exports = ItemController;