import React from "react";
import { mount, shallow } from "enzyme";
import { Button } from "@material-ui/core";
import SharedComponentExample from "./SharedComponentExample";

const wrapper = mount(<SharedComponentExample text="Test" type="primary" />);

describe("Shared component example -", () => {
  // Snapshot testing is not useful using jest Snapshot https://dev.to/destro_mas/jest-snapshot-testing-for-react-components-is-useless-is-it-slowly-dying-4cce
  // it('should render the Component correctly', () => {
  //   expect(wrapped).toMatchSnapshot();
  // });

  it("renders the Button", () => {
    expect(wrapper.find(Button).length).toBe(1);
  });

  it("passes all props to Button", () => {
    const buttonWrapper = wrapper.find(Button);

    expect(buttonWrapper.find(Button).props().children).toEqual("Test");
    expect(buttonWrapper.find(Button).props().variant).toEqual("contained");
    expect(buttonWrapper.find(Button).props().type).toEqual("submit");
  });

  it("click event is called", () => {
    const mockCallBack = jest.fn();
    const button = shallow(
      <SharedComponentExample
        text="Test"
        type="primary"
        onClick={mockCallBack}
      />
    );
    
    button.find(Button).simulate("click");

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
