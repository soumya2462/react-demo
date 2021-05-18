import React from 'react';
import { mount } from 'enzyme';
import SideMenu from './SideMenu';
import { findByTestAttr, storeFactory } from '../../utilities/testUtils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const setup = (initialState: any) =>{
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <SideMenu><span data-test="side-menu-children"/></SideMenu>
      </MemoryRouter>
    </Provider>
  );
}

describe('', () => {
  let wrapper: any;

  beforeEach(() => {
    const initialState = {
      auth: {
        accessToken: '',
      },
    };
    wrapper = setup(initialState);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-side-menu');
    expect(component.exists()).toBe(true);
  });

  test('link list exists', () => {
    const linkList = findByTestAttr(wrapper, 'link-list');
    expect(linkList.exists()).toBe(true);
  });

  test('bottom icons exists', () => {
    const icons = findByTestAttr(wrapper, 'bottom-icons');
    expect(icons.exists()).toBe(true);
  });

  test('person icon exists', () => {
    const icons = findByTestAttr(wrapper, 'person-icon');
    expect(icons.exists()).toBe(true);
  });
});