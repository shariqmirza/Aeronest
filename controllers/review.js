const Review = require("../models/review")
const Listing = require("../models/listing")


// for create new review
module.exports.createNewReview = async (req, res)=>{
    const listing = await Listing.findById(req.params.id);
    let newReview = new Review (req.body.review);

    newReview.author  = req.user._id;
    // console.log(newReview)

    listing.reviews.push(newReview);
    await newReview.save();
    // console.log(newReview)
    await listing.save();
    req.flash("success", "Review Added Successfully!")
    res.redirect(`/listings/${listing._id}`);
}

// for delete review
module.exports.destroyReview = async (req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Successfully!")
    res.redirect(`/listings/${id}`)
}