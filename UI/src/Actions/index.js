import axios from 'axios';


export function todos(todos) {
    return {
        type: 'TODOS_LOADED',
        todos
    };
}

export function buckets(buckets) {
    return {
        type: 'BUCKETS_LOADED',
        buckets
    };
}

export function getTodos() {
    return (dispatch) => {
        axios.get("http://localhost:8000/todo/todos")
            .then(res => {
                console.log(res.data)
                dispatch(todos(res.data));
            }).catch((err) => {
                console.error(err)
            });

    };
    
}

export function getBuckets() {
    return (dispatch) => {
        axios.get("http://localhost:8000/todo/buckets")
            .then(res => {
                console.log(res.data)
                dispatch(buckets(res.data));
            }).catch((err) => {
                console.error(err)
            });

    };

    
}

export function addBucket(params) {
    return (dispatch) => {
        axios.post("http://localhost:8000/todo/addBucket",params,{ headers: { "Content-Type":"application/json" }})
            .then(res => {
                console.log(res)
                dispatch(getBuckets());
            }).catch((err) => {
                console.error(err)
            });

    };

    
}

export function addTodo(params) {
    return (dispatch) => {
        axios.post("http://localhost:8000/todo/addTodo",params,{ headers: { "Content-Type":"application/json" }})
            .then(res => {
                console.log(res)
                dispatch(getTodos());
            }).catch((err) => {
                console.error(err)
            });

    };

    
}

export function updateTodo(todoId,params) {
    return (dispatch) => {
        axios.put(`http://localhost:8000/todo/updateTodo/${todoId}/`,params,{ headers: { "Content-Type":"application/json" }})
            .then(res => {
                console.log(res)
                dispatch(getTodos());
            }).catch((err) => {
                console.error(err)
            });

    };

    
}
export function deleteTodo(todoId) {
    return (dispatch) => {
        axios.delete(`http://localhost:8000/todo/deleteTodo/${todoId}`)
            .then(res => {
                console.log(res)
                dispatch(getTodos());
            }).catch((err) => {
                console.error(err)
            });

    };

    
}

export function saveUserInfo(params,history) {
    return (dispatch) => {
        axios.post("http://localhost:8000/todo/saveUserInfo",params,{ headers: { "Content-Type":"application/json" }})
            .then(res => {
                if (res.status === 200) {
                    history.push(`/Home`)
                }
            })
            history.push(`/Home`)
    };

    
}





