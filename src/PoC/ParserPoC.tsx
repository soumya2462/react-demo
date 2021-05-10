import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import axios from 'axios';
import qs from 'querystring';
import ReactHtmlParser from 'react-html-parser';
import { RootState } from '../store';
import ContentLayout from '../components/Layout/ContentLayout';

type ParserPoCStats = {
  templateId: string,
  html: string,
};

type dummyProps = {};

class ParserPoC extends Component<dummyProps, ParserPoCStats> {
  constructor(props: dummyProps) {
    super(props);

    this.state = {
      templateId: 'fd4ede1b-169d-4366-8e2c-3f233d0c505a',
      //templateId: 'ed48cafa-a6fd-446a-9a6f-34b638388fee',
      html: '',
    };
  }

  componentDidMount() {
    const { templateId } = this.state;

    axios.get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/templates/${templateId}`,
     {
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     })
    .then(response => {
      //log off based on response. How can a non error response be invalid? Maybe only after
      this.setState({html: response.data.html});
    },
    (error) => {
      console.log(error);
      // alert with error message
      // which error message might also need for logOff()?
    });

    const $style = document.createElement("style");
    document.head.appendChild($style);
    $style.innerHTML = `#testButton { color: green; }`;
  };
  
  render() {
    const { html } = this.state;
    return (
      <ContentLayout title="Parser">
        <div>
          { ReactHtmlParser(html) }
        </div>
      </ContentLayout>
    );
  };
};

export default ParserPoC;