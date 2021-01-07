import { mount } from "enzyme";
import SharedComponentExample from "./../shared/SharedComponentExample/SharedComponentExample";
import ComponentExample from "./ComponentExample";
import { Provider } from "react-redux";
import store from "./../../store/index";

const routeComponentPropsMock = {
  history: {} as any,
  location: {} as any,
  match: {} as any,
};

const wrapper = mount(
  <Provider store={store}>
    <ComponentExample
      history={routeComponentPropsMock.history}
      location={routeComponentPropsMock.location}
      match={routeComponentPropsMock.match}
    />
  </Provider>
);

describe("Component example -", () => {
  // Snapshot testing is not useful using jest Snapshot https://dev.to/destro_mas/jest-snapshot-testing-for-react-components-is-useless-is-it-slowly-dying-4cce
  // it('should render the Component correctly', () => {
  //   expect(wrapped).toMatchSnapshot();
  // });

  it("renders SharedComponentExample", () => {
    expect(wrapper.find(SharedComponentExample).length).toBe(1);
  });

  it("passes all props to SharedComponentExample", () => {
    const sharedComponentWrapper = wrapper.find(SharedComponentExample);

    expect(
      sharedComponentWrapper.props().type
    ).toEqual("primary");

    expect(
      sharedComponentWrapper.props().text
    ).toEqual("Sign In");
  });
});
