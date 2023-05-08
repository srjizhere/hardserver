const express = require("express");
const { Notice } = require("../model/notice.model");

const noticeRouter = express.Router();
noticeRouter.use(express.json());

noticeRouter.get("/",async(req,res)=>{
    console.log("notice get vistied");
    // const { author_name, notice_title, notice_desc } = req.body;
    // const on = Date.now()
    try{
        let  all_notice = await Notice.find();
        res.status(200).send({msg:all_notice})
    }catch(err){
        console.log(err);
        res.status(400).send({err:"Error while fetching"})
    }

})
noticeRouter.post("/",async(req,res)=>{
    console.log("notice post vistied");
    const { author_name, notice_title, notice_desc } = req.body;
    const on = Date.now()
    try{
       const notice = new Notice({
       author_name,notice_title,notice_desc,on
       });
       await notice.save();
       res.status(200).send({msg:"posted"})
    }catch(err){
        console.log(err);
        res.status(400).send({Err:"Error while posting"})
    }
})
noticeRouter.patch("/",async(req,res)=>{
    console.log("notice patch vistied");
    const on = Date.now()
    let id= req.query.id
    try{
       await Notice.findByIdAndUpdate(id,req.body)
       res.status(200).send({msg:"updated"})
    }catch(err){
        console.log(err);
        res.status(400).send({Err:"Error while updating"})
    }
})
noticeRouter.delete("/",async(req,res)=>{
    console.log("notice delete vistied");
    let _id= req.query.id
    console.log(_id);
    try{
      let ans =  await Notice.findByIdAndDelete(_id)
      console.log(ans);
      if(ans){
          res.status(200).send({msg:"deleted"})
      }else{
        res.send({msg:"not found"})
      }
    }catch(err){
        console.log(err);
        res.status(400).send({Err:"Error while posting"})
    }
})



module.exports = {
    noticeRouter
}