import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import TemplateList from './MandatoryTemplateList';
import { findByTestAttr, storeFactory } from '../../utilities/test';

const setup = () => {
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <TemplateList />
      </MemoryRouter>
    </Provider>
  );
};

test('renders mandatory page template list component without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-mandatory-page-templates-list');
  expect(component.length).toBe(1);
});

test('renders template list list without error', () => {
  const wrapper = setup();
  const templateList = findByTestAttr(wrapper, 'mandatory-page-templates-list-list');
  expect(templateList.length).toBe(1);
});
