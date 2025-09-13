
const DestinationModel = require('../Models/Destination')
const {v4: uuidv4} = require('uuid');
const BookingModel = require('../Models/Bookings')

const addDestination = async (req, res) => {

    const dataF = JSON.parse(req.body.datas);
    console.log(dataF)
    const file = req.file;
    console.log("datas")

    try {

        const destinationId = uuidv4();

        const newData = new DestinationModel({
            destinationId,
            destinationName: dataF.DestinationName,
            destinationImage: file?.path || '',
            shortDescription: dataF.ShortDescription,
            longDescription: dataF.LongDescription,
            originalPrice: Number(dataF.OriginalPrice),
            discountPrice: Number(dataF.DiscountPrice),
            category: dataF.Category,
            package: dataF.Package,
        });

        const saved = await newData.save()
        // console.log("DATA", newData)
        return res.json({success: true, message: "Destination Added", saved});


    } catch (err) {
        console.log("somethig error")
        if (!res.headersSent) {
            return res.status(500).json({success: false, message: "Server Error", error: err.message});
        }
    }

}




const GetDestinations = async (req, res) => {
    const getPackage = req.body.getPackage;

    try {
        const destinationData = await DestinationModel.find({
            package: getPackage
        })
        if (destinationData) {
            return res.json({DestinationData: destinationData, message: "Data fount"})
        }
        console.log(destinationData)
    } catch (err) {
        return res.json({message: "No Data fount"})
    }
}


const allDestination = async (req, res) => {
    // console.log("all")
    try {
        const destinations = await DestinationModel.find({});
        // console.log("dats", destinations)
        return res.json(destinations)
    } catch (err) {
        console.log("error")
    }
}



//-------------------------------------------
//booking 

const bookDestination = async (req, res) => {
    // const bookingData=req.body;
    // console.log("booking", req.body.bookingData)
    // console.log("user", req.userId)
    // const bookdata = req.body
    const bookingData = req.body.bookingData
    const booking_id = uuidv4().slice(0, 8)

    // res.json({hey: "HELO"})

    try {
        const booking = new BookingModel(
            {
                bookingId: booking_id,
                userId: req.userId,
                dateOfBooking: bookingData.date,
                destinationId: bookingData.destinationId,
                people: bookingData.people
            }
        )
        booking.save()
        console.log("Saved")
        console.log("date0",bookingData.date)
        res.json({saved: true})
    }
    catch (err) {
        console.log("err", err)
        res.json({saved: false})
    }


}


//-------------------------------------------
// fetch use bookings




const userbookings = async (req, res) => {
    try {
        // 1. Get all bookings for this user
        const userBookings = await BookingModel.find({
            userId: "abdulrasak45675c561482"
        });

        // 2. Collect all destinationIds from bookings
        const destinationIds = userBookings.map(b => b.destinationId);

        // 3. Fetch all destinations in ONE query (optimized)
        const destinations = await DestinationModel.find({
            destinationId: {$in: destinationIds}   // assuming DestinationModel has `destinationId`
        });

        // 4. Merge bookings with their destinations
        const bookingsWithDestinations = userBookings.map(b => {
            const dest = destinations.find(d => d.destinationId === b.destinationId);
            return {
                bookingId: b.bookingId,
                userId: b.userId,
                dateOfBooking: b.dateOfBooking,
                confirm: b.confirm,
                people: b.people,
                destination: dest || null
            };
        });

        res.json({userDestinations:bookingsWithDestinations});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error fetching bookings", error: err.message});
    }
};


module.exports = {addDestination, GetDestinations, allDestination, bookDestination, userbookings}