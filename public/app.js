document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');

    const fetchTodos = async () => {
        const response = await fetch('/todos');
        const todos = await response.json();
        renderTodos(todos);
    };

    const renderTodos = (todos) => {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = "list-group-item d-flex justify-content-between align-items-start";
            
            li.innerHTML = `
                <div class="row w-100">
                    <div class="col-md-2">
                        <img src="${todo.imageUrl}" alt="Product Image" class="img-thumbnail w-100">
                    </div>
                    <div class="col-md-7">
                        <h5 class="fw-bold">${todo.title}</h5>
                        <p>${todo.description}</p>
                        <p>Price: $${todo.price}</p>
                    </div>
                    <div class="col-md-3 d-flex align-items-center">
                        <button class="btn btn-warning btn-sm me-2" onclick="editTodo(${todo.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteTodo(${todo.id})">Delete</button>
                    </div>
                </div>
            `;
            todoList.appendChild(li);
        });
    };
    

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const imageUrl = document.getElementById('imageUrl').value;

        const response = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, price, imageUrl })
        });

        const newTodo = await response.json();
        fetchTodos();
        form.reset();
    });

    window.editTodo = async (id) => {
        const title = prompt('New title:');
        const description = prompt('New description:');
        const price = prompt('New price:');
        const imageUrl = prompt('New image URL:');

        await fetch(`/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, price, imageUrl })
        });

        fetchTodos();
    };

    window.deleteTodo = async (id) => {
        await fetch(`/todos/${id}`, { method: 'DELETE' });
        fetchTodos();
    };

    fetchTodos();
});
