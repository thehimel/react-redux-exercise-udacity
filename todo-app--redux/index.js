// Reducer Function - A Pure Function
function todos (state = [], action) {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo]);
    }

    return state;
}

function createStore () {
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


    return {
        getState,
        subscribe
    }
}

const store = createStore();

store.subscribe(() => {
    console.log('The new state is: ', store.getState());
});

const unsubscribe = store.subscribe(() => {
    console.log('The store is changed.');
});

unsubscribe();