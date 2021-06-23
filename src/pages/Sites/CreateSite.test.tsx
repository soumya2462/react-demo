import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import CreateSite from './CreateSite';
import { findByTestAttr, storeFactory } from '../../utilities/test';

const setup = () => {
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <CreateSite/>
      </MemoryRouter>
    </Provider>
  );
}


test('renders site setup component without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-create-site');
  expect(component.exists()).toBe(true);
});