const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve Bootstrap from node_modules
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));

let todos = []; // This will act as our in-memory database

// Serve the static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API to get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// API to add a todo item
app.post('/todos', (req, res) => {
    const { title, description, price, imageUrl } = req.body;
    const newTodo = { title, description, price, imageUrl, id: Date.now() };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// API to delete a todo item
app.delete('/todos/:id', (req, res) => {
    todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
    res.status(204).end();
});

// API to edit a todo item
app.put('/todos/:id', (req, res) => {
    const { title, description, price, imageUrl } = req.body;
    todos = todos.map(todo => todo.id === parseInt(req.params.id) ? { id: parseInt(req.params.id), title, description, price, imageUrl } : todo);
    res.json(todos.find(todo => todo.id === parseInt(req.params.id)));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
