const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/reviews');
const { reviewSchema } = require('../schemas.js');

router.post("/", async (req, res) => {
    const { id } = req.params
    const review = new Review(req.body.review)
    const campground = await Campground.findById(id)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'sucessfully updated review!')
    res.redirect(`/campgrounds/${campground._id}`)
})

router.delete("/:reviewId", async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'sucessfully deleted review!')
    res.redirect(`/campgrounds/${id}`)
})

module.exports = router;