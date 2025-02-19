import mongoose, { connect } from "mongoose";

const connectDB = async () =>{
await mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('Mongo connected'))
.catch( err => {
    console.error("Mongo connection error:" , err);
    process.exit(1);
})
}
export default connectDB;