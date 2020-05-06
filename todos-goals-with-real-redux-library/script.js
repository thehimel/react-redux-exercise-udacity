
function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

// Define Constants
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Action Creators
function addTodoAction (todo) {
    return {
        type: ADD_TODO,
        todo,
    };
}

function removeTodoAction (id) {
    return {
        type: REMOVE_TODO,
        id,
    };
}

function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id,
    };
}

function addGoalAction (goal) {
return {
        type: ADD_GOAL,
        goal,
    };
}

function removeGoalAction (id) {
    return {
        type: REMOVE_GOAL,
        id,
    };
}

// Reducer Function 1 - A Pure Function
function todos (state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            // Return state concatinating the given todo obj.
            return state.concat([action.todo]);

        case REMOVE_TODO:
            // Return the state except the todo matching the given id.
            return state.filter((todo) => todo.id !== action.id);

        case TOGGLE_TODO:
            /*
            For every todo in state if todo.id is not equal to action.id, return the todo as it is.
            lse, toggle the state of complete with Object.assign() where
            1st arg is an empty obj, 2nd arg is the todo obj that merges in the empty obj
            Except the change in the 3rd arg where we toggle the state of complete.
            */
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete }));

        default:
            // If no action.type is matched, return the given state as it is.
            return state;
    }

    
}

// Reducer Function 2 - A Pure Function
function goals (state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])

        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)

        default:
            return state
    }
}

// Initialize Store
const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals
}))

// Define the listener
store.subscribe(() => {
    console.log('The new state is: ', store.getState())
    const { goals, todos } = store.getState()

    document.getElementById('goals').innerHTML = ''
    document.getElementById('todos').innerHTML = ''

    goals.forEach(addGoalToDOM)
    todos.forEach(addTodoToDOM)
})

/*
store.dispatch(addTodoAction({
    id: 0,
    name: 'Walk the dog',
    complete: false,
}));

store.dispatch(addTodoAction({
    id: 1,
    name: 'Wash the car',
    complete: false,
}));

store.dispatch(addTodoAction({
    id: 2,
    name: 'Go to the gym',
    complete: true,
}));

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux'
}));

store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 20 pounds'
}));

store.dispatch(removeGoalAction(0));
*/

// DOM code
function addTodo () {
    const input = document.getElementById('todo')
    const name = input.value
    input.value = ''

    store.dispatch(addTodoAction({
        name,
        complete: false,
        id: generateId()
    }))
}

function addGoal () {
    const input = document.getElementById('goal')
    const name = input.value
    input.value = ''

    store.dispatch(addGoalAction({
        id: generateId(),
        name,
    }))
}

document.getElementById('todoBtn').addEventListener('click', addTodo)
document.getElementById('goalBtn').addEventListener('click', addGoal)

function createRemoveButton (onClickFunction) {
    const removeBtn = document.createElement('button')
    removeBtn.innerHTML = 'X'
    removeBtn.addEventListener('click', onClickFunction)
    return removeBtn
}

function addTodoToDOM (todo) {
    const node = document.createElement('li')
    const text = document.createTextNode(todo.name)

    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeTodoAction(todo.id))
    })

    node.appendChild(text)
    node.appendChild(removeBtn)

    node.style.textDecoration = todo.complete ? 'line-through' : 'none'
    node.addEventListener('click', () => {
        store.dispatch(toggleTodoAction(todo.id))
    })

    document.getElementById('todos').appendChild(node)
}

function addGoalToDOM (goal) {
    const node = document.createElement('li')
    const text = document.createTextNode(goal.name)

    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeGoalAction(goal.id))
    })

    node.appendChild(text)
    node.appendChild(removeBtn)

    document.getElementById('goals').appendChild(node)
}