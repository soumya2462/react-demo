import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { ContentLayout } from '../components/Layout';
import EditorButtons from './EditorButtons';

type CssJsEditorState = {
  key: string,
  html: string,
};

type CssJsEditorProps = {
  templateId: string,
  title: string,
};

const options = {
  mode: 'xml',
  theme: 'material',
  lineNumbers: true,
};

class CssJsEditorPoC extends Component<CssJsEditorProps, CssJsEditorState> {
  constructor(props: CssJsEditorProps) {
    super(props);

    this.state = {
      key: '',
      html: '',
      //templateId: 'fd4ede1b-169d-4366-8e2c-3f233d0c505a',
      //templateId: 'c2a95458-c0af-443e-86db-a5fe3678e192',
    };
  }

  fetchData() {
    axios.get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/templates/${this.props.templateId}`)
    .then(response => {
      //log off based on response. How can a non error response be invalid? Maybe only after
      this.setState({ html: response.data.html, key: this.props.templateId});
    },
    (error) => {
      console.log(error);
      // alert with error message
      // which error message might also need for logOff()?
    });
  };

  componentDidMount() {
    console.log("component did mount");
    this.fetchData();
  };

  componentDidUpdate() {
    console.log("component did update");
    if(this.props.templateId != this.state.key){
      this.fetchData();
      console.log("updating");
    }
  };
  
  handleEditorChange = (editor: any, data: any, value:any) => {
    this.setState({html: value});
  }

  handleSaveClick = (e: any) => {
    const { html } = this.state;
    const { templateId } = this.props;
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
      <ContentLayout title={this.props.title}>
        <div>
          <CodeMirror
            value={this.state.html}
            options={options}
            onBeforeChange={this.handleEditorChange}
            onChange={(editor, value) => {
              console.log('controlled', {value});
            }}
          />
          <EditorButtons
            saveClick={this.handleSaveClick}
            cancelClick={() => {}}
            defaultClick={() => {}}
          />
        </div>
      </ContentLayout>
    );
  };
};

export default CssJsEditorPoC;






