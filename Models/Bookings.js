const mongoose = require('mongoose')
const BookingsSchema = mongoose.Schema(
    {
        bookingId: {type: String, required: true, unique: true, trim: true},
        destinationId: {type: String},
        userId: {type: String},
        dateOfBooking: {type: String},
        confirm: {type: bookingId},
        people: {type: Number}
    }, {
    timestamps: true

}
)

module.exports = mongoose.model('Bookings', BookingsSchema)