import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { store } from "./../../store/index";
import { Login as UnwrappedLogin, default as Login } from "./Login";
import { fireEvent, getByPlaceholderText } from "@testing-library/react";

const wrapper = mount(
  <Provider store={store}>
    <Login />
  </Provider>
);

describe("Testing Login component - ", () => {

  it("check prop values - should only show Login page when isLoggedIn is false", () => {
    var loginWrapper = wrapper.find(UnwrappedLogin);

    expect(loginWrapper.prop("isLoggedIn")).toBe(false);
    expect(loginWrapper.prop("username")).toBe("");
    expect(loginWrapper.prop("accessToken")).toBe("");
  });


  it("show password clicked - should show password when showPassword is true", () => {
    var loginWrapper = wrapper.find(UnwrappedLogin);
    var passwordInput = loginWrapper.find("input[name='password']");
    
    expect(loginWrapper.state("showPassword")).toBe(false);
    expect(passwordInput.prop("type")).toBe("password");

    var hidePasswordButton = loginWrapper.find("button.MuiButtonBase-root.MuiIconButton-root");
    expect(hidePasswordButton).toHaveLength(1);
    hidePasswordButton.simulate('click');

    expect(loginWrapper.state("showPassword")).toBe(true);
    expect(wrapper.find(UnwrappedLogin).find("input[name='password']").prop("type")).toBe("text");
  });


  it("show password clicked - should hide password when showPassword is false", () => {
    wrapper.find(UnwrappedLogin).setState({ showPassword: true });

    var loginWrapper = wrapper.find(UnwrappedLogin);
    var passwordInput = loginWrapper.find("input[name='password']");
    
    expect(loginWrapper.state("showPassword")).toBe(true);
    expect(passwordInput.prop("type")).toBe("text");

    var hidePasswordButton = loginWrapper.find("button.MuiButtonBase-root.MuiIconButton-root");
    expect(hidePasswordButton).toHaveLength(1);
    hidePasswordButton.simulate('click');

    expect(loginWrapper.state("showPassword")).toBe(false);
    expect(wrapper.find(UnwrappedLogin).find("input[name='password']").prop("type")).toBe("password");
  });


  it("forgot password link - is visible", () => {
    var forgotPasswordLink = wrapper.find("a.MuiTypography-root.MuiLink-root");
    expect(forgotPasswordLink).toHaveLength(1);
  });


  it("status update - typing username saves it in state", () => {
    var loginWrapper = wrapper.find(UnwrappedLogin);
    var usernameInput = loginWrapper.find("input[name='username']");
    
    expect(usernameInput.prop("value")).toBe("");
    usernameInput.simulate("change", { target: { name: "username", value: "usernameTest" } });
    
    expect(wrapper.find(UnwrappedLogin).find("input[name='username']").prop("value")).toBe("usernameTest");
    expect(loginWrapper.state("username")).toBe("usernameTest");
  });


  it("status update - typing password when not visible saves it in state", () => {
    var loginWrapper = wrapper.find(UnwrappedLogin);
    var passwordInput = loginWrapper.find("input[name='password']");

    expect(passwordInput.prop("type")).toBe("password");
    passwordInput.simulate("change", { target: { name: "password", value: "pw123" } });

    expect(loginWrapper.state("password")).toBe("pw123");
  });


  it("status update - typing password when visible saves it in state", () => {
    wrapper.find(UnwrappedLogin).setState({ showPassword: true });

    var loginWrapper = wrapper.find(UnwrappedLogin);
    var passwordInput = loginWrapper.find("input[name='password']");

    expect(passwordInput.prop("type")).toBe("text");
    passwordInput.simulate("change", { target: { name: "password", value: "pw123" } });

    expect(wrapper.find(UnwrappedLogin).find("input[name='password']").prop("value")).toBe("pw123");
    expect(loginWrapper.state("password")).toBe("pw123");
  });


  it("sign in button - is visible and clickable", () => {
    var signInButton = wrapper.find("button.MuiButtonBase-root.MuiButton-root");
    expect(signInButton).toHaveLength(1);
    expect(signInButton.prop("disabled")).toBe(false); // maybe also simulate a click and check function call number?
  });


  it("remember me checkbox - clicking in checkbox changes visually and updates state", () => {
    var loginWrapper = wrapper.find(UnwrappedLogin);
    var rememberCheckbox = loginWrapper.find("input[name='rememberMe']");

    expect(loginWrapper.state("rememberMe")).toBe(false);
    expect(rememberCheckbox.prop("checked")).toBe(false);
    rememberCheckbox.simulate("change", { target: { checked: true } });

    expect(loginWrapper.state("rememberMe")).toBe(true);
    expect(wrapper.find(UnwrappedLogin).find("input[name='rememberMe']").prop("checked")).toBe(true);
    rememberCheckbox.simulate("change", { target: { checked: false } });

    expect(loginWrapper.state("rememberMe")).toBe(false);
    expect(wrapper.find(UnwrappedLogin).find("input[name='rememberMe']").prop("checked")).toBe(false);
  });

/*
  it("remember me checkbox - clicking in Remember me? next to checkbox changes checkbox visually and updates state", () => {
    var loginWrapper = wrapper.find(UnwrappedLogin);
    var rememberCheckbox = loginWrapper.find("input[name='rememberMe']");
    var rememberText = loginWrapper.find(".MuiTypography-root.MuiFormControlLabel-label");

    expect(loginWrapper.state("rememberMe")).toBe(false);
    expect(rememberCheckbox.prop("checked")).toBe(false);
    //rememberText.simulate("change", { target: { checked: true } });
    rememberText.simulate("click", { target: { checked: true }});

    expect(loginWrapper.state("rememberMe")).toBe(true);
    expect(wrapper.find(UnwrappedLogin).find("input[name='rememberMe']").prop("checked")).toBe(true);
    rememberText.simulate("change", { target: { checked: false } });

    expect(loginWrapper.state("rememberMe")).toBe(false);
    expect(wrapper.find(UnwrappedLogin).find("input[name='rememberMe']").prop("checked")).toBe(false);
  });
*/
  // add tests to check if error messages are being shown (when ready)
});