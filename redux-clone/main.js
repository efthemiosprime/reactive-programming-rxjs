import Rx from 'rxjs/Rx';
console.log("redux clone");
const doneEl = document.querySelector("#done");
const inputEl = document.querySelector('input');
const activeEl = document.querySelector('#active');


 // - appState
const appState = new Rx.BehaviorSubject({todos:[]});


 // - dispatch actions
const dispatcher = fn => (...args) => appState.next(fn(...args));
const createTodo = dispatcher(data => ({type: "CREATE_TODO", data}));
const toggleTodo = dispatcher(data => ({type: "TOGGLE_TODO", data}));

 // - updateView
const li = todo => `<li>${todo.text}</li>`;
function updateView(state) {

     activeEl.innerHTML = state.todos
                            .filter( todo => !todo.done)
                            .map(li).join(' ');

     doneEl.innerHTML = state.todos
                            .filter( todo => todo.done)
                            .map(li).join(' ');
}

  // - reducer
function reducer(state, action) {
     switch(action.type) {
        case 'CREATE_TODO':
            return Object.assign({}, 
                state,
                {todos: state.todos.concat([{text: action.data, done: false}])
            })
         default:
            return state || {};
     }
}
appState.scan(reducer).subscribe(updateView);
createTodo('Add View');
createTodo("Add Image");


 // - DOM events
Rx.Observable.fromEvent(inputEl, 'keyup')
    .filter(e => e.key === "Enter")
    .map( e => e.target.value)
    .subscribe(text => {
        createTodo(text);
        inputEl.value = '';
    })