const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");


//database cnnection
require("./mongo");
//Models
require("./model/Post");

//middleware
app.use(bodyParser.json())
   .use(morgan()) 

const Post = mongoose.model("Post");
app.get("/posts", async(req, res) => {
   try {
       const Posts = await Post.find({});
       res.send(Posts);
   } catch (error) {
       res.status(500);
       
   }
})

app.put("/posts/:postId", async(req, res) => {
    try {
        const posts = await Post.findByIdAndUpdate({_id:req.params.postId},req.body,{new:true,runValidators:true});
        res.send(posts);

    } catch (error) {
        res.status(500);
        
    }
 })

 app.delete("/posts/:postId", async(req, res) => {
    try {
        const posts = await Post.findByIdAndRemove({_id:req.params.postId});
        res.send(posts);

    } catch (error) {
        res.status(500);
        
    }
 })


app.get("/posts/:postId", async (req, res) => {
    try {
        const posts = await Post.findOne({_id:req.params.postId});
        res.send(posts);
    } catch (error) {
        res.status(500);
        
    }
 })

app.post("/posts", async (req, res) => {
  
    try {
        const post = new Post();
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.send(post);
    } catch (error) {
        res.status(500);
    }

 })

app.listen(3001, function () {
    console.log('server running on port 3001');
})