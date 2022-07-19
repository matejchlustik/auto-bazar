const express = require("express")
const router = express.Router()
const {
    getOffers,
    postOffer,
    searchOffers,
    getLatestOffers
} = require("../controllers/offerController")

const { validateOffer } = require("../middleware/validator")

router.route("/").get(getOffers).post(validateOffer, postOffer)
router.route("/search").post(searchOffers)
router.route("/latest").get(getLatestOffers)

module.exports = router