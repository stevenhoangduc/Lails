// <!-- updated all application to lail 1/28 -->

const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");
const User = require("../models/user");



router.get("/", async function (req, res) {
  console.log(req.session, " req.session in index of lails");
  try {
    const currentUser = await UserModel.findById(req.session.user._id);
console.log(currentUser)
    res.render("lails/index.ejs", {
      lails: currentUser.lails,
    });

  } catch (err) {
    console.log(err);
    res.send("Error Rendering all lails check terminal");
  }
});

router.get("/new", function (req, res) {
  res.render("lails/new.ejs");
});

// friday 1/24 FOURTH
router.put('/:lailId', async function(req, res){
	try {
		// find the logged in the user
		const currentUser = await UserModel.findById(req.session.user._id)
		// find the current Application (Mongoose document method)
		const lail = currentUser.lails.id(req.params.lailId)
		// update the lail (mongoose Document method called .set)
		lail.set(req.body) // set takes the updates on the object( req.body, contents of the form)
		// tell the database we made the update
		await currentUser.save()

		// redirect back to the show page
		res.redirect(`/users/${currentUser._id}/lails/${lail._id}`)


	} catch(err){
		console.log(err)
		res.send("error updating lail, check terminal")
	}
})
// friday 1/24 FOURTH

// friday 1/24 THIRD
router.get('/:lailId/edit', async function(req, res){
	try {
			// Look up the user, then grab the application that matches the id in params
		// from the user's applications array
		const currentUser = await UserModel.findById(req.session.user._id)
		// find the application ("The google" Mongoose document methods)
		const lail = currentUser.lails.id(req.params.lailId)
		// respond to the client with the ejs page
		res.render('lails/edit.ejs', {
			lail: lail
		})
	

	} catch(err){
		console.log(err)
		res.send('Error getting edit form, check terminal')
	}
})
// friday 1/24 THIRD

// friday 1/24 SECOND
router.delete('/:lailId', async function(req, res){
	try {
		// look up the user, because the user has the lails array
		// Google (Mongoose Model Methods)
		const currentUser = await UserModel.findById(req.session.user._id)
		// look up and delete the application in the array that matches the iid
		// in the params
		// Google (Mongoose Document Methods)
		currentUser.lails.id(req.params.lailId).deleteOne();
		// tell the database that we deleted lail in the array
		await currentUser.save()


		// to the client to make a get request to the lails/index route
		res.redirect(`/users/${currentUser._id}/lails`)

	} catch(err){
		console.log(err)
		res.send('Error deleting lail, check terminal!')
	}
})
// friday 1/24 SECOND

// friday 1/24 FIRST
// show route after the new! So express matches the new
router.get('/:lailId', async function(req, res){
	// THe job of this function is to render a specific lail
	try {
		// Look up the user, then grab the lail that matches the id in params
		// from the user's lails array
		const currentUser = await UserModel.findById(req.session.user._id)
		// find the lail ("The google" Mongoose document methods)
		const lail = currentUser.lails.id(req.params.lailId)
		// respond to the client with the ejs page
		res.render('lails/show.ejs', {
			lail: lail
		})

	} catch(err){
		console.log(err)
		res.send("error and show page check your terminal!")
	}
}) // friday 1/24 FIRST

router.post("/", async function (req, res) {
  try {
    // look up the user
    const currentUser = await UserModel.findById(req.session.user._id);
    // then add the contents of the form to the users lails array
    currentUser.lails.push(req.body);
    // anytime we mutate a document we must tell the database
    // by calling .save
    await currentUser.save();
    console.log(currentUser, " <- currentUser");
    // redirect back to the index route
    res.redirect(`/users/${currentUser._id}/lails`);
  } catch (err) {
    console.log(err);
    res.send("Error check the terminal to debug");
  }
});

router.put('/:lailId/likes', async function(req, res){
	try {
		
		const currentUser = await UserModel.findById(req.session.user._id)
		
		const lail = currentUser.lails.id(req.params.lailId)
		

		if (lail.likes){
			lail.likes ++
		} else {
			lail.likes = 1
		}

		await currentUser.save()

		// redirect back to the show page
		res.redirect(`/users/${currentUser._id}/lails/${lail._id}`)


	} catch(err){
		console.log(err)
		res.send("error updating lail, check terminal")
	}
})

// we need to mount the router in our server.js in order to use it!
module.exports = router;
