import mongoose from "mongoose";
const Schema = mongoose.Schema;

const greetingSchema = new Schema({
    message: String
});

export default mongoose.model('Greeting', greetingSchema);