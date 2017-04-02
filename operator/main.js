import Rx from 'rxjs/Rx';

var observer1 = Rx.Observable.create(sub => {
    sub.next ("new data");
    sub.error("custom error");
    sub.complete();
});

/*
*  OBSERVER
*/
observer1.subscribe(console.log, console.error, ()=>console.log("done"));


/*
*  OPERATOR
*/
var observer2 = observer1.map(x => x + 100);
observer2.subscribe(console.log);