const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const cors = require("cors")
const { connectDB } = require("./config/db")
const port = process.env.PORT || 5000
const offerRoutes = require("./routes/offerRoutes")
const { errorHandler } = require("./middleware/errorMiddleware")

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/api/offers", offerRoutes)




app.use(errorHandler)

app.listen(port, () => { console.log(`Server started on port ${port}`) })