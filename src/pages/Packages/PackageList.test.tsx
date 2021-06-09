import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PackageList from './PackageList';
import { findByTestAttr, storeFactory } from '../../utilities/test';

const setup = () =>{
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <PackageList />
      </MemoryRouter>
    </Provider>
  );
}

test('renders package list component without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-package-list');
  expect(component.length).toBe(1);
});

test('renders package list list without error', () => {
  const wrapper = setup();
  const packageList = findByTestAttr(wrapper, 'package-list-list');
  expect(packageList.length).toBe(1);
});