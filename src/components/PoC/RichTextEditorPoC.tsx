import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
//import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from '@material-ui/core';
import axios from 'axios';
import qs from 'querystring';
  
type RichTextEditorPoCState = {
  html: string,
  templateId: string,
};

type dummyProps = {};

class RichTextEditorPoC extends Component<dummyProps, RichTextEditorPoCState> {
  constructor(props: dummyProps) {
    super(props);

    this.state = {
      html: '',
      templateId: 'fd4ede1b-169d-4366-8e2c-3f233d0c505a',
      //templateId: 'ed48cafa-a6fd-446a-9a6f-34b638388fee',
    };
  }

  handleEditorChange = (e: any) => {
    this.setState({html: e.target.getContent()});
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

  render() {
    return (
      <div>
        <Editor
          apiKey='igy32r06yhpq2kh2fdjw8sjayfm478ul8rxg9v6nz072ovrp'
          initialValue={this.state.html}
          init={{
            height: 500,
            menubar: 'tools',
            plugins: [
              'advlist autolink lists link image', 
              'charmap print preview anchor help',
              'searchreplace visualblocks code',
              'insertdatetime media table paste wordcount',
              'code'
            ],
            toolbar:
              'undo redo | formatselect | bold italic | \
              alignleft aligncenter alignright | \
              bullist numlist outdent indent | help | \
              code'
          }}
          onChange={this.handleEditorChange}
        />
        {/*<div className="App">
          <h2>Using CKEditor 5 build in React</h2>
          <CKEditor
            editor={ ClassicEditor }
            data="<p>Hello from CKEditor 5!</p>"
            onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ ( event, editor ) => {
              const data = editor.getData();
              console.log( { event, editor, data } );
            } }
            onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
            } }
          />
        </div>*/}
        <Button onClick={this.handleSaveClick}>Save</Button>
      </div>
    );
  };
};

export default RichTextEditorPoC;