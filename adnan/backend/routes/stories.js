const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Stories = require("../models/Stories");
const { body, validationResult } = require("express-validator");

//Route :1  Get  All Stories using get : "./api/stories/getallstories" : Login Required
router.get("/getallstories", fetchuser, async (req, res) => {
  try {
    const stories = await Stories.find({ user: req.user.id });
    res.json(stories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server Error");
  }
});

//Route :2  Add a new Story using post : "./api/stories/addstory" : Login Required
router.post(
  "/addstory",
  fetchuser,
  [
    // username must be at least 3 chars long
    body("text", "Text a valid title").isLength({ min: 3 }),
    // Description must be at least 5 chars long
    body("picture", "Picture Must be Atleast 5 Chars Long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { text, picture, video } = req.body;
    // if there are errors then return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const story = new Stories({
        text,
        picture,
        video,
        user: req.user.id,
      });
      const saveStory = await story.save();
      res.json(saveStory);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal Server Error");
    }
  }
);

//Route :3  Add a new Story using post : "./api/stories/deletestory/:id" : Login Required
router.delete("/deletestory/:id", fetchuser, async (req, res) => {
  try {
    let stories = await Stories.findById(req.params.id)
    if(!stories){
      return res.status(404).send("Not Found")
    }
    if(stories.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed")
    }
    stories=await Stories.findByIdAndDelete(req.params.id)
    res.json({"Success":"Storiy has been deleted"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server Error");
  }
});

//Route :4  Update a existisng Story using post : "./api/stories/updatestory/:id" : Login Required
router.put("/updatestory/:id", fetchuser, async (req, res) => {
  const { text, picture, video } = req.body;
  try {
    const newStory = {};
    if(text){newStory.text=text}
    if(picture){newStory.picture=picture}
    if(video){newStory.video=video}
    let stories = await Stories.findById(req.params.id)
    if(!stories){
      return res.status(404).send("Not Found")
    }
    if(stories.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed")
    }
    stories=await Stories.findByIdAndUpdate(req.params.id,{$set:newStory},{new:true})
    res.json({"Success":"Storiy has been Updated",stories});
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server Error");
  }
});


module.exports = router;
