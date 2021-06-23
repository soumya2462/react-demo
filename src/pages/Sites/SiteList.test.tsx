import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import SiteList from './SiteList';
import { findByTestAttr, storeFactory } from '../../utilities/test';

const setup = () => {
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <SiteList />
      </MemoryRouter>
    </Provider>
  );
}

test('renders site list component without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-site-list');
  expect(component.length).toBe(1);
});

test('renders site list list without error', () => {
  const wrapper = setup();
  const siteList = findByTestAttr(wrapper, 'site-list-list');
  expect(siteList.length).toBe(1);
});