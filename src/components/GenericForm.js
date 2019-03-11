import React, { Component } from "react";
import * as FormTypes from "./forms";
import SchemaForm from "./schemaForm";
import { Container } from "semantic-ui-react";
import {
  completeTask,
  startProcessInstance,
  loadTaskVariables
} from "../actions";
import { connect } from "react-redux";

class GenericForm extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (!this.state || !this.state.loading) {
      this.loadExistingVariables();
    }
  }

  render() {
    console.log(FormTypes);
    const { formKey, processDefinitionKey, taskId } = this.props;
    if (typeof FormTypes[processDefinitionKey][formKey] !== "undefined") {
      const Form = FormTypes[processDefinitionKey][formKey];
      if (taskId == null) {
        return (
          <div className="generic-form">
            <Form
              onSubmit={(values, dispatch) =>
                this.handleStartInstance(values, dispatch)
              }
            />
          </div>
        );
      } else {
        return (
          <div className="generic-form">
            <Form
              onSubmit={(values, dispatch) =>
                this.handleComplete(values, dispatch)
              }
            />
          </div>
        );
      }
    } else {
      return (
        <Container>
          <SchemaForm processDefinitionKey={processDefinitionKey} />
        </Container>
      );
    }
  }

  loadExistingVariables() {
    let { form, dispatch, taskId } = this.props;
    if (form) {
      this.setState({ loading: true });
      dispatch(loadTaskVariables(taskId, form.registeredFields));
    }
  }

  handleComplete(values, dispatch) {
    values = this.getBody(values);
    return dispatch(completeTask(this.props.taskId, values));
  }

  handleStartInstance(values, dispatch) {
    values = this.getBody(values);
    return dispatch(
      startProcessInstance(this.props.processDefinitionKey, values)
    );
  }

  getBody(values) {
    let variables = {};
    Object.keys(values).forEach(item => {
      variables[item] = { value: values[item] };
    });
    return {
      variables: variables
    };
  }
}

export default connect(state => ({}))(GenericForm);
