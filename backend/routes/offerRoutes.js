const express = require("express")
const router = express.Router()
const {
    getOffers,
    postOffer,
    searchOffers,
    getLatestOffers,
    getOffer
} = require("../controllers/offerController")

const { validateOffer } = require("../middleware/validator")

router.route("/").get(getOffers).post(validateOffer, postOffer)
router.route("/search").get(searchOffers)
router.route("/latest").get(getLatestOffers)
router.route("/:id").get(getOffer)

module.exports = router