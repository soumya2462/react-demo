import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import WorkflowList from './WorkflowList';
import { findByTestAttr, storeFactory } from '../../utilities/test';

const setup = () => {
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <WorkflowList packageId={''} />
      </MemoryRouter>
    </Provider>
  );
}

test('renders workflow list component without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-workflow-list');
  expect(component.length).toBe(1);
});

test('renders workflow list list without error', () => {
  const wrapper = setup();
  const workflowList = findByTestAttr(wrapper, 'workflow-list-list');
  expect(workflowList.length).toBe(1);
});