import mongoose from 'mongoose';
import { Todo } from './db/todo';

main();

async function main() {
    await mongoose.connect('mongodb://localhost:27017/cs732-se750-quiz-2022', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');
    console.log();

    await clearDatabase();
    console.log();

    await addData();
    console.log();

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}

async function clearDatabase() {
    const response = await Todo.deleteMany({});
    console.log(`Cleared database (removed ${response.deletedCount} todos).`);
}

async function addData() {

    const todo = new Todo({ Description: "I need to mop the floors.", CompletedStatus: false, DueDate: "29/09/2022" });
    await todo.save();

    console.log(`Todo '${todo.Description}' added to database (_id = ${todo._id})`);
}