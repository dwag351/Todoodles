import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    Description: Schema.Types.String,
    CompletedStatus: Schema.Types.Boolean,
    DueDate: Schema.Types.String
});

const Todo = mongoose.model('Todo', todoSchema);

export { Todo };