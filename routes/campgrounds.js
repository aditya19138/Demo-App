const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campground/index', { campgrounds })
})

router.post("/", async (req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    req.flash('success', 'Successfully added a campground')
    res.redirect("/campgrounds")
})

router.get("/new", (req, res) => {
    res.render("campground/new")
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id).populate('reviews')
    res.render('campground/show', { campground })
})

router.get("/:id/edit", async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    res.render("campground/edit", { campground })
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds")
})

module.exports = router;