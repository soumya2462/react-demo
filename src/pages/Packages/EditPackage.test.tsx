import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import EditPackage from './EditPackage';
import { findByTestAttr, storeFactory } from '../../utilities/testUtils';

const setup = () =>{
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <EditPackage/>
      </MemoryRouter>
    </Provider>
  );
}

describe('', () => {
  let wrapper: ReactWrapper;
  
  beforeEach(() => {   
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  
  test('renders edit package component without error', () => {
    const component = findByTestAttr(wrapper, 'component-edit-package');
    expect(component.exists()).toBe(true);
  });

  test('renders package name label without error', () => {
    const component = findByTestAttr(wrapper, 'edit-package-name-label');
    expect(component.exists()).toBe(true);
  });

  test('renders package name textfield without error', () => {
    const component = findByTestAttr(wrapper, 'edit-package-name-input');
    expect(component.exists()).toBe(true);
  });

  test('renders initial workflow label', () => {
    const component = findByTestAttr(wrapper, 'initial-workflow-label');
    expect(component.exists()).toBe(true);
  });

  test('renders initial workflow select without error', () => {
    const component = findByTestAttr(wrapper, 'initial-workflow-select');
    expect(component.exists()).toBe(true);
  });

  test('renders claims statuses label without error', () => {
    const component = findByTestAttr(wrapper, 'claim-statuses-label');
    expect(component.exists()).toBe(true);
  });
  
  test('renders buttons without error', () => {
    const component = findByTestAttr(wrapper, 'save-cancel-buttons');
    expect(component.exists()).toBe(true);
  });
});
