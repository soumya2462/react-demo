import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';
import { findByTestAttr } from '../../utilities/test';

const setup = (props: any) => shallow(<Navbar {...props} />);

describe('is logged in', () => {
  let wrapper: any;
  const mockCallBack = jest.fn();
  const props = {
    isLoggedIn: true,
    handleSideMenuToggle: mockCallBack,
  };
  
  beforeEach(() => {
    wrapper = setup(props);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-navbar');
    expect(component.length).toBe(1);
  });

  test('side menu toggle button exists', () => {
    const btn = findByTestAttr(wrapper, 'side-menu-toggle-btn');
    expect(btn.exists()).toBe(true);
  });

  test('side menu toggle button click event', () => {
    const btn = findByTestAttr(wrapper, 'side-menu-toggle-btn');
    btn.simulate('click');
    expect(mockCallBack).toBeCalled();
  });

  test('navbar home image exists', () => {
    const img = findByTestAttr(wrapper, 'home-image');
    expect(img.exists()).toBe(true);
  });
});

describe('is not logged in', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = setup({ isLoggedIn: false });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-navbar');
    expect(component.length).toBe(1);
  });  

  test('does not display side menu toggle button', () => {
    const btn = findByTestAttr(wrapper, 'side-menu-toggle-btn');
    expect(btn.exists()).toBe(false);
  });

  test('navbar home image exists', () => {
    const img = findByTestAttr(wrapper, 'home-image');
    expect(img.exists()).toBe(true);
  });
});