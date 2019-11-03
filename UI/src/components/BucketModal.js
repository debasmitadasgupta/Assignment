// frontend/src/components/Modal.js

import React, { Component } from "react";
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

export default class BucketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    bucket_name:'',
      bucketList:[]
    };
  }

  componentDidMount() {
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ bucket_name:value });
  };
  render() {
    const { bucketToggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={bucketToggle}>
        <ModalHeader toggle={bucketToggle}>Add Bucket </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="bucket_name">Bucket name</Label>
              <Input
                type="text"
                name="bucket_name"
                onChange={this.handleChange}
                placeholder="Enter Bucket Name"
              />
            </FormGroup>
           
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.bucket_name)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
