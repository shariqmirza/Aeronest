const express = require("express");
const router = express.Router({mergeParams: true});
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js")
const Listing = require("../models/listing");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/review.js")

// Review -- post route -- create new post
router.post("/", isLoggedIn, validateReview, wrapAsync (reviewController.createNewReview));

//Delete Review
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;