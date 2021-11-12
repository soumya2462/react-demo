import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import CreateWorkflow from './CreateWorkflow';
import { findByTestAttr, storeFactory } from '../../utilities/test';

const setup = () => {
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <CreateWorkflow />
      </MemoryRouter>
    </Provider>
  );
};

describe('', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const initialState = {};
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders create workflow component without error', () => {
    const component = findByTestAttr(wrapper, 'component-create-workflow');
    expect(component.exists()).toBe(true);
  });

  test('renders workflow name label without error', () => {
    const component = findByTestAttr(wrapper, 'create-workflow-name-label');
    expect(component.exists()).toBe(true);
  });

  test('renders workflow name textfield without error', () => {
    const component = findByTestAttr(wrapper, 'create-workflow-name-input');
    expect(component.exists()).toBe(true);
  });

  test('renders buttons without error', () => {
    const component = findByTestAttr(wrapper, 'save-cancel-buttons');
    expect(component.exists()).toBe(true);
  });
});
