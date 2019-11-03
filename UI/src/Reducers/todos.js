export function todos(state=[],action){
    
    switch(action.type){
        case'TODOS_LOADED':
            return action.todos;
        
        default:
            return state;
    }
}

export function buckets(state=[],action){
    
    switch(action.type){
        case'BUCKETS_LOADED':
            return action.buckets;
        
        default:
            return state;
    }
}

