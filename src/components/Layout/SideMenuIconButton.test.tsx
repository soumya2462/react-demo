import React from 'react';
import { shallow } from 'enzyme';
import { AccessibleForwardOutlined } from '@material-ui/icons';
import SideMenuIconButton from './SideMenuIconButton';
import { findByTestAttr } from '../../utilities/testUtils';

const mockCallBack = jest.fn();

const defaultProps = {
  icon: <AccessibleForwardOutlined data-test="item-link-icon"/>,
  onClick: mockCallBack,
};

const setup = () => shallow(<SideMenuIconButton {...defaultProps} />);

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-side-menu-icon-button');
  expect(component.length).toBe(1);
});

test('icon displays', () => {
  const wrapper = setup();
  const icon = findByTestAttr(wrapper, 'item-link-icon');
  expect(icon.exists()).toBe(true);
});

test('click event', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-side-menu-icon-button');
  component.simulate('click');
  expect(mockCallBack).toBeCalled();
});