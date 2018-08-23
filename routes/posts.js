const router = require("express").Router();
const mongoose = require("mongoose");

const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

router.get("/", async (req, res) => {
        const Posts = await Post.find({});
        res.send(Posts);

})

router.put("/:postId", async (req, res) => {

        const posts = await Post.findByIdAndUpdate({
                _id: req.params.postId
        }, req.body, {
                new: true,
                runValidators: true
        });
        res.send(posts);

})

router.delete("/:postId", async (req, res) => {

        const posts = await Post.findByIdAndRemove({
                _id: req.params.postId
        });
        res.send(posts);
})


router.get("/:postId", async (req, res) => {
        const posts = await Post.findOne({
                _id: req.params.postId
        });
        res.send(posts);

})

router.post("/", async (req, res) => {

        const post = new Post();
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.send(post);

})

//Section for comment
//Create Comment
router.post("/:postId/comment", async (req, res) => {
        //Find a Post
        const post = await Post.findOne({
                _id: req.params.postId
        })
        //Create a post
        const comment = new Comment();
        comment.content = req.body.content;
        comment.post = post._id;
        await comment.save();

        //Associate Post with comment
        post.comment.push(comment._id);
        await post.save();
        res.send(comment);


})

//Read a comment
router.get("/:postId/comment", async (req, res) => {

        const post = await Post.findById({
                _id: req.params.postId
        }).populate("comment");
        res.send(post);
})

//Update a comment
router.put("/comment/:commentId", async (req, res) => {

        const comment = await Comment.findByIdAndUpdate({
                _id: req.params.commentId
        }, req.body, 
        {
                new:true,
                runValidators:true
        });
        res.send(comment);
})

//Delete a cooment

router.delete("/comment/:commentId", async (req,res)=>{
        await Comment.findByIdAndRemove(req.params.commentId);
        res.send({message:"Comment successfully deleted"});
})

module.exports = router;