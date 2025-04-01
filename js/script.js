let todoForm = document.querySelector("form")
let todoInput = document.getElementById("todo-input")
let todoList = document.getElementById("items")
let allTodos = getTodos()
updateTodoList()
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    addTodo()
})
function addTodo() {
    const todoText = todoInput.value.trim()
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject)
        updateTodoList()
        saveTodos()
        todoInput.value = ""
    }
}
function updateTodoList() {
    todoList.innerHTML = ""
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoitem(todo, todoIndex)
        todoList.append(todoItem)
    })
}
function createTodoitem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex
    const todoLi = document.createElement("li")
    const todoText = todo.text
    todoLi.className = "todo"
    todoLi.innerHTML = `
                <input type="checkbox" name="" id="${todoId}">
                <label for="${todoId}" class="custom-checkbox" 0>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#e3e3e3">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </button>
    `
    const deletebtn = todoLi.querySelector(".delete-btn")
    const checkbox = todoLi.querySelector("input")
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos()
    })
    checkbox.checked = todo.completed;
    deletebtn.addEventListener("click",()=>{
        deleteTodoItem(todoIndex);
    })
    return todoLi
}
function saveTodos() {
    const todoJSON = JSON.stringify(allTodos)
    localStorage.setItem("todos", todoJSON)
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]"
    return JSON.parse(todos)
}
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_,i)=> i !== todoIndex)
    saveTodos()
    updateTodoList()
}