const express = require("express")
const router = express.Router()
const {
    getOffers,
    postOffer
} = require("../controllers/offerController")

const { validateOffer } = require("../middleware/validator")

router.route("/").get(getOffers).post(validateOffer, postOffer)


module.exports = router