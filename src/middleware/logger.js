/** Curry middelwarre function for logging */
/*
export default function(store) {
    return function(next) {
        return function(action) {
            console.log('Next:', next);
            console.log('Action:', action);
            next(action);
            console.log('State:', store.getState());
        }
    }
}
*/

/** ES6 lambda function */
export default (store) => (next) => (action) => {
    // console.log('Next:', next);
    console.log('Action:', action);
    next(action);
    console.log('State:', store.getState());
}
