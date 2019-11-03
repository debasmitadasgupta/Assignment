// frontend/src/App.js
import { connect } from 'react-redux';
import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";
import BucketModal from "./BucketModal";
import { getTodos,getBuckets,addBucket,addTodo,updateTodo,deleteTodo } from '../Actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    this.props.getTodos()
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed Todos
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete Todos
        </span>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
      if(this.props.todos.length > 0){
      const newItems = this.props.todos.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  }
};
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  bucketToggle=()=>{
    this.setState({ bucketmodal: !this.state.bucketmodal });
  };
  handleSubmit = item => {
    console.log(item)
    this.toggle();
    if (item.id) {
      this.props.updateTodo(item.id,item)
      return;
    }
    this.props.addTodo(item)
    
  };

  handleBucketSubmit = bucket =>{ 
    console.log(bucket)
    this.bucketToggle()
    let params={bucket_name : bucket}
    this.props.addBucket(params)
  }
  handleDelete = item => {
   this.props.deleteTodo(item.id)
  };
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  
  render() {
    return (
      <main className="content">
        <h1 className="text-uppercase text-center my-4" style={{color:'#d08289'}}>Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add task
                </button>
                <button onClick={()=>this.setState({ bucketmodal: !this.state.bucketmodal }) } className="btn btn-primary" style={{marginLeft:'5px'}}>
                  Add Bucket
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
    {this.state.bucketmodal ?(
    <BucketModal
    bucketToggle={this.bucketToggle}
    onSave={this.handleBucketSubmit}/>):null
    }}
      

      </main>
    );
  }
}

//mapping redux states to local props
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    buckets:state.buckets
  }
};

//dispatching actions through local props of type function
const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: () => dispatch(getTodos()),
    getBuckets:() => dispatch(getBuckets()),
    addBucket:(params) => dispatch(addBucket(params)),
    addTodo:(params) => dispatch(addTodo(params)),
    updateTodo:(todoId,params) => dispatch(updateTodo(todoId,params)),
    deleteTodo:(todoId) => dispatch(deleteTodo(todoId))
  }
};

// exporting Home component as HOC
export default connect(mapStateToProps, mapDispatchToProps)(Home);
