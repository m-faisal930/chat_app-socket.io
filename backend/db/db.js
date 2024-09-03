import mongoose from "mongoose";

const connectToMongo = (uri) =>{
    mongoose.connect(uri).then(()=>console.log("Connected")).catch((error)=> console.log(`Error occured: ${error}`))
}

export default connectToMongo;