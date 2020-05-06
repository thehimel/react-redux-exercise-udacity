
// Library Code
function createStore (reducer) {
    /*
    The Store should have 4 parts:
    1. The state
    2. Get the state
    3. Listen to changes on state
    4. Update the state
    */

    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        }
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };


    return {
        getState,
        subscribe,
        dispatch
    }
}


// App Code
// Reducer Function - A Pure Function
function todos (state = [], action) {
    switch (action.type) {
        case 'ADD_TODO' :
            // Return state concatinating the given todo obj.
            return state.concat([action.todo]);

        case 'REMOVE_TODO':
            // Return the state except the todo matching the given id.
            return state.filter((todo) => todo.id !== action.id);

        case 'TOGGLE_TODO' :
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


const store = createStore(todos);

store.subscribe(() => {
    console.log('The new state is: ', store.getState());
});

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
});

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: 'Read a book',
        complete: true
    }
});

store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
});

store.dispatch({
    type: 'REMOVE_TODO',
    id: 1
});

