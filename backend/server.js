const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const { connectDB } = require("./config/db")
const port = process.env.PORT || 5000
const offerRoutes = require("./routes/offerRoutes")
const { errorHandler } = require("./middleware/errorMiddleware")

connectDB()

const app = express()

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }, { limit: '10mb' }));

app.use("/api/offers", offerRoutes)

app.use(errorHandler)

//Handle production
if (process.env.NODE_ENV === 'production') {
    //static folder
    app.use(express.static(__dirname + '/public'))

    //handle spa
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.listen(port, () => { console.log(`Server started on port ${port}`) })