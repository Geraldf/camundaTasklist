import React, { Component } from "react";
import {
  completeTask,
  startProcessInstance,
  loadTaskVariables
} from "../actions";

import Form from "react-jsonschema-form-semanticui";
import { connect } from "react-redux";

class SchemaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.schema = {
      title: "A registration form",
      description: "A simple form example.",
      type: "object",
      required: ["firstName", "lastName"],
      properties: {
        firstName: {
          type: "string",
          title: "First name"
        },
        lastName: {
          type: "string",
          title: "Last name"
        },
        age: {
          type: "integer",
          title: "Age"
        },
        bio: {
          type: "string",
          title: "Bio"
        },
        password: {
          type: "string",
          title: "Password",
          minLength: 3
        },
        telephone: {
          type: "string",
          title: "Telephone",
          minLength: 10
        }
      }
    };
    this.formData = {
      firstName: "Chuck",
      lastName: "Norris",
      age: 75,
      bio: "Roundhouse kicking asses since 1940",
      password: "noneed"
    };
    this.log = type => console.log.bind(console, type);
  }

  render() {
    const {
      formKey,
      processDefinitionKey,
      taskId,
      onSubmit,
      startProcessInstance,
      entities
    } = this.props;
    return (
      <Form
        schema={this.schema}
        formData={this.formData}
        // onChange={this.log("changed")}
        onSubmit={this.sendForm}
        startProcess={startProcessInstance}
        processDefinitionKey={processDefinitionKey}
        // onError={this.log("errors")}
      />
    );
  }

  sendForm(data) {
    this.startProcess(this.processDefinitionKey, { variables: data.formData });
  }
}
function mapStateToProps(state) {
  const { error } = state.entities;

  //return { result: error };
  return state;
}

const actionCreators = {
  completeTask,
  startProcessInstance,
  loadTaskVariables
};

export default connect(
  mapStateToProps,
  actionCreators
)(SchemaForm);
