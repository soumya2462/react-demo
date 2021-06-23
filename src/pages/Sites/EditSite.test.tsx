import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import CreatePackage from './EditSite';
import { findByTestAttr, storeFactory } from '../../utilities/test';

const setup = () => {
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <CreatePackage/>
      </MemoryRouter>
    </Provider>
  );
}
  
test('renders site setup component without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-edit-site');
  expect(component.exists()).toBe(true);
});