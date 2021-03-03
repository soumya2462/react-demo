import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

type CssJsEditorState = {
  html: string,
  templateId: string,
};

type dummyProps = {};

const options = {
  mode: 'xml',
  theme: 'material',
  lineNumbers: true
};

class CssJsEditorPoC extends Component<dummyProps, CssJsEditorState> {
  constructor(props: dummyProps) {
    super(props);

    this.state = {
      html: '',
      //templateId: 'fd4ede1b-169d-4366-8e2c-3f233d0c505a', usar outro
      templateId: 'c2a95458-c0af-443e-86db-a5fe3678e192',
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/templates/${this.state.templateId}`)
    .then(response => {
      //log off based on response. How can a non error response be invalid? Maybe only after
      this.setState({html: response.data.html});
    },
    (error) => {
      console.log(error);
      // alert with error message
      // which error message might also need for logOff()?
    });
  };
  
  handleEditorChange = (editor: any, data: any, value:any) => {
    console.log(`editor: ${editor}`);
    console.log(`data: ${data}`);
    console.log(`value/jss/css: ${value}`);
    this.setState({html: value});
  }

  handleSaveClick = (e: any) => {
    const { html, templateId } = this.state;
    const body = {
      id: templateId,
      html,
    };
    
    axios.put(
      `${process.env.REACT_APP_DESIGN_GATEWAY_URL}/templates/${templateId}`,
      body,
    )
    .then(response => {
      //log off based on response. How can a non error response be invalid? Maybe only after 
      console.log(response);
    },
    (error) => {
      console.log(error);
      // alert with error message
      // which error message might also need for logOff()?
    });
  }
  
  render() {
    return (
      <div>
        <CodeMirror
          value={this.state.html}
          options={options}
          onBeforeChange={this.handleEditorChange}
          onChange={(editor, value) => {
            console.log('controlled', {value});
          }}
        />
        <Button onClick={this.handleSaveClick}>Save</Button>
      </div>
    );
  };
};

export default CssJsEditorPoC;






