// frontend/src/components/Modal.js

import React, { Component } from "react";
import { getTodos,getBuckets } from '../Actions';
import { connect } from 'react-redux';
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      bucketList:[]
    };
  }

  componentDidMount() {
    this.fetchBuckets();
  }
  fetchBuckets = () => {
    this.props.getBuckets()
  };


  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>
            <FormGroup>
              <Label for="bucket_id">Buckets</Label>
              <select name="bucket_id"  value={this.state.activeItem.bucket_id} onChange={e=>this.handleChange(e)}>
                <option value='' disabled selected>Please Select</option>
      {this.props.buckets.length > 0 ? (this.props.buckets.map(item =>
      <option key={item.id} value={item.id}>{item.bucket_name}</option>
    )):null};         
  </select>
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    buckets:state.buckets
  }
};

//dispatching actions through local props of type function
const mapDispatchToProps = (dispatch) => {
  return {
    getBuckets:() => dispatch(getBuckets())
  }
};

// exporting Home component as HOC
export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);
