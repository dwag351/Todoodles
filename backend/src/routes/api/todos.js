import express from 'express';
import { Todo } from '../../db/todo';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

router.get('/', async (req, res) => {
    res.json(await retrieveAllTodos());
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await retrieveTodo(id);

        if (todo) {
            res.json(todo);
        }
        else {
            res.sendStatus(HTTP_NOT_FOUND);
        }
    } catch (error) {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

router.post('/', async (req, res) => {
    const newTodo = await createTodo({
        Description: req.body.Description,
        CompletedStatus: req.body.CompletedStatus,
        DueDate: req.body.DueDate
    });

    res.status(HTTP_CREATED)
        .header('Location', `/api/todos/${newTodo._id}`)
        .json(newTodo);
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const todo = req.body;
    todo._id = id;
    const success = await updateTodo(todo);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await deleteTodo(id);
    res.sendStatus(HTTP_NO_CONTENT);
});

async function createTodo(todo) {

    const dbTodo = new Todo(todo);
    await dbTodo.save();
    return dbTodo;
}

async function retrieveAllTodos() {
    return await Todo.find();
}

async function retrieveTodo(id) {
    return await Todo.findById(id);
}

async function updateTodo(todo) {

    const dbTodo = await Todo.findById(todo._id);

    if (dbTodo) {

        dbTodo.Description = todo.Description;
        dbTodo.CompletedStatus = todo.CompletedStatus;
        dbTodo.DueDate = todo.DueDate;

        await dbTodo.save();
        return true;
    }

    return false;
}

async function deleteTodo(id) {
    await Todo.deleteOne({ _id: id });
}

export default router;