import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce';
//import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Theme, withStyles } from '@material-ui/core';
import axios from 'axios';
import qs from 'querystring';
import { ContentLayout } from '../components/Layout';
import EditorButtons from './EditorButtons';
import VariableDropdown from './VariableDropdown';

const useStyles = (theme: Theme) => ({
  buttonGroup: {
    paddingTop: "1.5rem",
  },
});

type RichTextEditorPoCState = {
  html: string,
  templateId: string,
};

type RichTextEditorPoCProps = {
  classes: {
    buttonGroup: string,
  },
};

const VariableList = [
  "var1",
  "var2",
  "var3",
  "var4",
  "var5",
  "the 1",
  "the 2",
  "the 3",
  "the 4",
  "a test",
  "another test",
  "asd test",
];

const PlaceholderList = [
  "place1",
  "place2",
  "place3",
  "place4",
];

const LinkList = [
  "link1"
];

class RichTextEditorPoC extends Component<RichTextEditorPoCProps, RichTextEditorPoCState> {
  constructor(props: RichTextEditorPoCProps) {
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

  fetchData = () => {
    axios.get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/templates/${this.state.templateId}`)
    .then(response => {
      //tinymce.get('TempEditor').execCommand('mceInsertContent', false, response.data.html);
      tinymce.get('TempEditor').execCommand('mceSetContent', false, response.data.html);
      this.setState({html: response.data.html});
    },
    (error) => {
      console.log(error);
      // alert with error message
      // which error message might also need for logOff()?
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <ContentLayout title="RichTextEditor">
        <div>
          <VariableDropdown
            variableList={LinkList}
            id="links"
            title="Links"
            placeholder="Type here to insert links"
            chipBackgroundColor="rgb(52, 73, 94)"
            chipBorderColor="rgb(49, 69, 89)" />
          <VariableDropdown
            variableList={PlaceholderList}
            id="placeholders"
            title="Placeholders"
            placeholder="Type here to insert placeholders"
            chipBackgroundColor="rgb(37, 115, 166)"
            chipBorderColor="rgb(35, 109, 157)" />
          <VariableDropdown
            variableList={VariableList}
            id="variables"
            title="Variables"
            placeholder="Type here to insert variables"
            chipBackgroundColor="rgb(218, 140, 16)"
            chipBorderColor="rgb(207, 133, 15)" />
          <Editor
            id="TempEditor"
            init={{
              height: 500,
              menubar: 'tools',
              plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'table emoticons template paste help'
              ],
              toolbar:
              'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | link image | print preview media fullpage | ' +
              'forecolor backcolor emoticons | help | code',
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
          <EditorButtons
            saveClick={this.handleSaveClick}
            cancelClick={() => {}}
            defaultClick={this.fetchData}
          />
        </div>
      </ContentLayout>
    );
  };
};

export default withStyles(useStyles)(RichTextEditorPoC);