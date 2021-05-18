import React from 'react';
import { shallow } from 'enzyme';
import { AccessibleForwardOutlined } from '@material-ui/icons';
import SideMenuListItemLink from './SideMenuListItemLink';
import { findByTestAttr } from '../../utilities/testUtils';

const defaultProps = {
  text: 'test title',
  icon: <AccessibleForwardOutlined data-test="item-link-icon"/>,
  to: '/test/endpoint',
};

const setup = () => shallow(<SideMenuListItemLink {...defaultProps} />);

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-side-menu-list-item-link');
  expect(component.length).toBe(1);
});

test('text component displays', () => {
  const wrapper = setup();
  const text = findByTestAttr(wrapper, 'item-link-text');
  expect(text.exists()).toBe(true);
});

test('icon displays', () => {
  const wrapper = setup();
  const icon = findByTestAttr(wrapper, 'item-link-icon');
  expect(icon.exists()).toBe(true);
});

test('right arrow displays', () => {
  const wrapper = setup();
  const rightArrow = findByTestAttr(wrapper, 'item-link-right-arrow');
  expect(rightArrow.exists()).toBe(true);
});