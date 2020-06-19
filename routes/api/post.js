const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const passport = require("passport");
const path = require('path');
const validatePostInput = require("../../validation/post");
const fs = require('fs');
const multer = require("multer");


router.get(
   "/",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      Post.find({ author: req.user.user_name })
         .then(posts => res.status(200).json(posts))
         .catch(err =>
            res
               .status(400)
               .json({ user: "Error fetching posts of logged in user" })
         );
   }
);

router.get("/post/:id", (req, res) => {
   Post.find({ _id: req.params.id })
      .then(post => res.status(200).json(post))
      .catch(err => res.status(400).json({ id: "Error fetching post by id" }));
});


router.get("/author/:author", (req, res) => {
   Post.find({ author: req.params.author })
      .then(posts => res.status(200).json(posts))
      .catch(err =>
         res
            .status(400)
            .json({ author: "Error fetching posts of specific author" })
      );
});

//Set Storage Engine
const storage = multer.diskStorage({
   destination: './public/uploads/images',
   filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + 
   path.extname(file.originalname));
   }
});


const upload = multer({
   storage: storage
});


router.post(
   "/create",
   upload.single('img'),
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      const author = req.user.user_name;
      let post = req.body;
      const { errors, isValid } = validatePostInput(post);
      if (!isValid) {
         return res.status(400).json(errors);
      }
      post.author = author;
      post.img = {};
      post.img.data = fs.readFileSync(req.file.path);
      post.img.contentType = 'image/png';
      
      const newPost = new Post(post);
      newPost
         .save()
         .then(doc => res.json(doc))
         .catch(err => console.log({ create: "Error creating new post" }));
   }
);

router.post(
   "/update/:id",
   upload.single('img'),
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      const author = req.user.user_name;
      const { errors, isValid } = validatePostInput(req.body);
      if (!isValid) {
         return res.status(400).json(errors);
      }
      const { title, body, videoURL } = req.body;
      const img = { data: fs.readFileSync(req.file.path), contentType: 'image/png' };
      Post.findOneAndUpdate(
         { author, _id: req.params.id },
         { $set: { title, body, videoURL, img } },
         { new: true }
      )
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ update: "Error updating existing post" })
         );
   }
);

router.delete(
   "/delete/:id",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      const author = req.user.user_name;
      Post.findOneAndDelete({ author, _id: req.params.id })
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ delete: "Error deleting a post" })
         );
   }
);

module.exports = router;