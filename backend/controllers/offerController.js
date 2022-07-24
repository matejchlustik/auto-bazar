const asyncHandler = require("express-async-handler")
const Offer = require("../models/offerModel")
const { cloudinary } = require("../utils/cloudinary")
const { validationResult } = require('express-validator');

// @desc Get all offers
// @route GET /api/offers
// @access public 
const getOffers = asyncHandler(async (req, res) => {
    const offers = await Offer.find()
    res.status(200).json(offers)
})

// @desc Post an offer
// @route POST /api/offers
// @access tbd/public for now
const postOffer = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const fileUrls = []

    try {
        for (const image of req.body.images) {
            const uploadedResponse = await cloudinary.uploader.
                upload(image.source, { upload_preset: "auto-bazar" })
            fileUrls.push(uploadedResponse.secure_url)
        }
        req.body.images = fileUrls
    } catch (error) {
        console.log(error)
    }

    const offer = await Offer.create(req.body)
    res.status(201).json(offer)
})

// @desc Get offers with qery
// @route GET /api/offers/search
// @access public
const searchOffers = asyncHandler(async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.status(400).json({ error: "Missing query string" })
    }

    const searchQuery = {}
    for (const [key, value] of Object.entries(req.query)) {
        if (value.length > 0) {
            if (key === "year" || key === "km") {
                searchQuery[key] = { $gte: value };
            } else if (key === "price") {
                searchQuery[key] = { $lte: value };
            } else {
                searchQuery[key] = value;
            }
        }
    }

    const offers = await Offer.find(searchQuery)
    res.status(200).json(offers)
})

// @desc Get 3 latest offers with images
// @route GET /api/offers/latest
// @access public
const getLatestOffers = asyncHandler(async (req, res) => {
    const offers = await Offer.find({ images: { $type: 'array', $ne: [] } }).sort({ _id: -1 }).limit(3)
    res.status(200).json(offers)
})

// @desc Get offer by id
// @route GET /api/offers/:id
// @access public
const getOffer = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "Missing id" })
    }

    const offer = await (Offer.findById(req.params.id))
    res.status(200).json(offer)
})

module.exports = {
    getOffers,
    postOffer,
    searchOffers,
    getLatestOffers,
    getOffer
}