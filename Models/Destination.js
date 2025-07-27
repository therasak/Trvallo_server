const mongoose=require('mongoose')
const DestinationSchema= new mongoose.Schema(
    {
        destinationId:{type:String,required:true,unique:true,trim:true},
        destinationName:{type:String},
        destinationImage:{type:String},
        shortDescription:{type:String},
        longDescription:{type:String},
        originalPrice:{type:Number},
        discountPrice:{type:Number},
        category:{type:String},
        package:{type:String},
        discount:{type:Number},
    },{
        timestamps:true
    }
)
module.exports=mongoose.model('Destination',DestinationSchema)