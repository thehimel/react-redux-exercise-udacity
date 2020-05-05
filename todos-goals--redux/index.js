
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
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo]);
    }

    return state;
}


/* Use cases
const store = createStore(todos);

store.subscribe(() => {
    console.log('The new state is: ', store.getState());
});

const unsubscribe = store.subscribe(() => {
    console.log('The store is changed.');
});

unsubscribe();
*/