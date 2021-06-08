import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import CreatePackage from './CreatePackage';
import { findByTestAttr, storeFactory } from '../../utilities/testUtils';

const setup = () =>{
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <CreatePackage/>
      </MemoryRouter>
    </Provider>
  );
}

describe('', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const initialState = {     
    };
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  
  test('renders create package component without error', () => {
    const component = findByTestAttr(wrapper, 'component-create-package');
    expect(component.exists()).toBe(true);
  });

  test('renders package name label without error', () => {
    const component = findByTestAttr(wrapper, 'create-package-name-label');
    expect(component.exists()).toBe(true);
  });

  test('renders package name textfield without error', () => {
    const component = findByTestAttr(wrapper, 'create-package-name-input');
    expect(component.exists()).toBe(true);
  });

  test('renders buttons without error', () => {
    const component = findByTestAttr(wrapper, 'save-cancel-buttons');
    expect(component.exists()).toBe(true);
  });
  
});
