const express = require('express');
const {findPostsById,fetchAllPosts,insertPost,deletePost} = require('./post-models');
const authRestrict = require('../utils/authRestrict')

const router = express.Router();

// fetch all posts
router.get('/',async (req,res)=>{
  const posts = await fetchAllPosts();
  if (!posts || posts.length === 0) {
    return res.status(400).json({
      message: "Posts not found, try again later.",
    })
  }
  return res.status(200).json(posts);
});

// fetch by postID
router.get('/:id', async (req,res)=>{
  // check for post
  const post = await findPostsById(req.params.id);
  if (!post){
    return res.status(404).json({
      message: "Post not found.",
    });
  }
  // all good
  return res.status(200).json(post);
});

// create post
router.post('/',
  authRestrict(),
  async (req,res)=>{

  // // const userID = parseInt(req.token.userID);

  // const sentPost = req.body;

  // // console.log("inserting...", userID,sentPost);
  // if (!req.body.content || !req.body.type || !req.body.color){
  //   return res.status(400).json({ message: "missing content, type, color"});
  // }

  // console.log("posting to db...");
  // const post = await insertPost({...sentPost, userID: 1});

  // if (!post){
  //   return res.status(404).json({
	// 		message: "Could not create post, try again later.",
	// 	});
  // }

  return res.status(201).json({
    message: "Thank you for your interest, submitting to the database has been locked down."
  });
});

router.delete('/:id', async (req,res)=>{
  // we would normally need to check if the proper owner is deleting their work, or the server
  // const userID = req.token.useID;
  // const post = await findPostsById(req.params.id);
  // if (post.userID !== userID){
  //   return res.status(403).json({
  //     message: "Not your content to delete."
  //   });
  // }

  const delPost = await deletePost(req.params.id);
  if (!delPost || delPost === 0) {
		return res.status(404).json({
			message: "Could not delete, try again later",
		});
  }

  return res.status(200).json({ message: "Post deleted" });
});

module.exports = router;