const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;
const User = require("./user")

const listingSchema = new Schema({
    title: {
        type: String
    },
    description: String,
    image: {
      url: String,
      filename: String,
  // filename: {
  //   type: String,
  //   default: "listingimage"
  // },
  // url: {
  //   type: String,
  //   default: "https://images.unsplash.com/photo-1558954054-8e7f71b98c4c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   set: (v) => v === ""? "https://images.unsplash.com/photo-1558954054-8e7f71b98c4c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v
  // }
},
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review"
      }
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
});

listingSchema.post("findOneAndDelete", async (listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;