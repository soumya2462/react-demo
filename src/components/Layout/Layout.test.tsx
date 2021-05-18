import React from 'react';
import { mount } from 'enzyme';
import Layout from './Layout';
import { findByTestAttr, storeFactory } from '../../utilities/testUtils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

const setup = (initialState: any) =>{
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <Layout><span data-test="layout-children"/></Layout>
      </MemoryRouter>
    </Provider>
  );
}

describe('if a user is not logged in', () => {
  let wrapper: any;
  beforeEach(() => {
    const initialState = {
      auth: {
        isLoggedIn: false,
      },
    };
    wrapper = setup(initialState);
  });

  afterEach(() => {
    wrapper.unmount();
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-layout');
    expect(component.length).toBe(1);
  });

  test('navbar exists', () => {
    const navbar = findByTestAttr(wrapper, 'navbar');
    expect(navbar.length).toBe(1);
  });

  test('children exists', () => {
    const children = findByTestAttr(wrapper, 'layout-children');
    expect(children.length).toBe(1);
  });

  test('drawer does not exist', () => {
    const drawer = findByTestAttr(wrapper, 'drawer');
    expect(drawer.length).toBe(0);
  })
});

describe('if a user is logged in', () => {
  let wrapper: any;
  beforeEach(() => {
    const initialState = {
      auth: {
        isLoggedIn: true,
      },
    };
    wrapper = setup(initialState);
  });

  afterEach(() => {
    wrapper.unmount();
  });
  
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-layout');
    expect(component.length).toBe(1);
  });

  test('navbar-logged-in exists', () => {
    const navbar = findByTestAttr(wrapper, 'navbar-logged-in');
    expect(navbar.length).toBe(1);
  });

  test('children exists', () => {
    const children = findByTestAttr(wrapper, 'layout-children');
    expect(children.length).toBe(1);
  });

  test('drawer exists', () => {
    const drawer = findByTestAttr(wrapper, 'drawer');
    expect(drawer.length).toBe(1);
  });
});