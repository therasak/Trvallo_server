
const DestinationModel = require('../Models/Destination')
const {v4: uuidv4} = require('uuid');

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

module.exports = {addDestination, GetDestinations, allDestination}