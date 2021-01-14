import React from "react";
import { render } from "@testing-library/react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/index";

const wrapper = mount(
  <Provider store={store}>
    <App />
  </Provider>
);

describe("App -", () => {
  // Snapshot testing is not useful using Snapshot https://dev.to/destro_mas/jest-snapshot-testing-for-react-components-is-useless-is-it-slowly-dying-4cce
  // it('should render the Component correctly', () => {
  //   expect(wrapped).toMatchSnapshot();
  // });

  it("renders default page", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const textElement = getByText("You are testing the Test release");
    expect(textElement).toBeInTheDocument();
  });
});