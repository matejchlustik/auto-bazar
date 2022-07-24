const mongoose = require("mongoose")

const offerSchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please add an category"]
    },
    make: {
        type: String,
        required: [true, "Please add a make"]
    },
    model: {
        type: String,
        required: [true, "Please add a model"]
    },
    fuel: {
        type: String,
        required: [true, "Please add a fuel type"]
    },
    year: {
        type: String,
        required: [true, "Please add a year"]
    },
    km: {
        type: String,
        required: [true, "Please add kilometers driven"]
    },
    price: {
        type: String,
        required: [true, "Please add a price"]
    },
    contact:
    {
        name: {
            type: String,
            required: [true, "Please add a name"]
        },
        city: {
            type: String,
            required: [true, "Please add a city"]
        },
        street: {
            type: String,
            required: [true, "Please add a street"]
        },
        house_number: {
            type: String,
            required: [true, "Please add a house number"]
        },
        postal_code: {
            type: String,
            required: [true, "Please add a postal code"]
        },
        number: {
            type: String,
            required: [true, "Please add a number"]
        },
        email: {
            type: String,
            required: [true, "Please add an email"]
        }
    },
    images: [String]

},
    {
        timestamps: true
    })

const Offer = mongoose.model("Offer", offerSchema)
module.exports = Offer
