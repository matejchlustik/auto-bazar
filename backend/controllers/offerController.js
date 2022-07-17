const asyncHandler = require("express-async-handler")
const Offer = require("../models/offerModel")
const { cloudinary } = require("../utils/cloudinary")
const { validationResult } = require('express-validator');
const { json } = require("express");

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
                upload(image.source, { upload_preset: "ml_default" })
            fileUrls.push(uploadedResponse.secure_url)
        }
        req.body.images = fileUrls
    } catch (error) {
        console.log(error)
    }

    const offer = await Offer.create(req.body)
    res.status(201).json(offer)
})

// @desc Search offers with query 
// @route POST /api/offers/search
// @access public
const searchOffers = asyncHandler(async (req, res) => {
    if (!req.body.searchQuery) {
        res.status(400).json({ error: "Please specify category" })
    }

    const offers = await Offer.find(req.body.searchQuery)
    res.status(200).json(offers)
})



module.exports = {
    getOffers,
    postOffer,
    searchOffers
}