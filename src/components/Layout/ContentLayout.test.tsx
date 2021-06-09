import React from 'react';
import { shallow } from 'enzyme';
import ContentLayout from './ContentLayout';
import { findByTestAttr } from '../../utilities/test';

const setup = (props={title: "test title"}) => {
  return shallow(
    <ContentLayout {...props}>
      <span data-test="children" />
    </ContentLayout>
  );
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-content-layout');
  expect(component.length).toBe(1);
});

test('renders title text', () => {
  const wrapper = setup();
  const title = findByTestAttr(wrapper, 'title');
  expect(title.text()).toBe('test title');
});

test('renders children', () => {
  const wrapper = setup();
  const children = findByTestAttr(wrapper, 'children');
  expect(children.length).toBe(1);
});