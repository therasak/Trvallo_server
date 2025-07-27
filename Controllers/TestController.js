const DestintionModel=require('../Models/Destination')

const addDestination = async (req, res) => {
    const data = JSON.parse(req.body.data);
    const file = req.file;

    try {

        const storeDestination= await DestintionModel.create({
            ...data,
            destinationImage:file
        }) 

    } catch (err) {

    }
    res.json({name: 'RASAK'}) 
}

module.exports = {addDestination};