const Listing = require("../models/listing");

//for index
module.exports.index = async (req, res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", {allListing});
}

//for new form
module.exports.renderNewForm =  (req, res)=> {
    res.render("listings/new.ejs");
}

//showing listing
module.exports.showListing = async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
        
    })
    .populate("owner");
    // console.log(listing);
    if(!listing){
        req.flash("error", "The listing does not exist.");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}

//for add new listing
module.exports.createNewListing = async (req, res,next)=> {
    let url = req.file.path
    let filename = req.file.filename
    // console.log(url , ".." , filename)
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename}
    await newListing.save();
    req.flash("success", "New Listing Added Successfully!")
    res.redirect("/listings");
}

//for render edit form
module.exports.renderEditForm = async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error", "The listing does not exist.");
        res.redirect("/listings");
    }
    let originalImageURL = listing.image.url
    originalImageURL = originalImageURL.replace("/upload", "/upload/h_100,w_150")
    res.render("listings/edit.ejs", {listing, originalImageURL});
}

//for update or edit listing
module.exports.updateListing = async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path
    let filename = req.file.filename
    listing.image = { url, filename }
    await listing.save()
    }
    req.flash("success", "Listing Updated Successfully!")
    res.redirect(`/listings/${id}`);
}

//for delete
module.exports.destroyListing = async (req, res) =>{
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send Valid Data");
    // }
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
        req.flash("success", "Listing Deleted Successfully!")

    res.redirect("/listings");
}