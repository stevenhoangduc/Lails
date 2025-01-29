const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");
const Comment = require("../models/comment");

router.post ('/users/:userId/lails/:lailId/comments', async function (req, res){
    try {
        const owner = await UserModel.findById(req.params.userId)
        console.log(owner)
        const lail = owner.lails.id(req.params.lailId)
        const newComment = await Comment.create(req.body)
        newComment.user = (req.session.user._id)
        await newComment.save ()
        lail.comments.push(newComment)
        await owner.save()
        res.redirect(`/users/${owner._id}/lails/${lail._id}`)
    }catch (err) {
    console.log(err);
    res.send("Error check the terminal to debug");
  }
}) 







module.exports = router;