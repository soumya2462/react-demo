import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ActionButtonGroup, {  ActionButtonGroupProps } from './ActionButtonGroup';
import { findByTestAttr } from '../../utilities/test';

const defaultProps = { actionButtons: [] };

const setup = (props: ActionButtonGroupProps=defaultProps) => {
  return shallow(
    <ActionButtonGroup {...props} />
  );
}

describe('No action', () => {
  test('props as empty array does not render', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-action-button-group');
    expect(component.length).toBe(0);
  });

  test('props as undefined does not render', () => {
    const wrapper = setup({actionButtons: undefined});
    const component = findByTestAttr(wrapper, 'component-action-button-group');
    expect(component.length).toBe(0);
  });
});

describe('Singe action', () => {
  let wrapper: ShallowWrapper;
  const props = { actionButtons: [{ actionName: 'Test', actionUrl: '/test/url' }] };

  beforeEach(() => {
    wrapper = setup(props);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-action-button-group');
    expect(component.length).toBe(1);
  });

  test('renders one action button', () => {
    const singleActionBtn = findByTestAttr(wrapper, 'single-action-btn');
    expect(singleActionBtn.length).toBe(1);
  });
});

describe('Two actions', () => {
  let wrapper: ShallowWrapper;
  const props = { actionButtons: [
    { actionName: 'Test1', actionUrl: '/test/url1' },
    { actionName: 'Test2', actionUrl: '/test/url2' },
  ]};

  beforeEach(() => {
    wrapper = setup(props);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-action-button-group');
    expect(component.length).toBe(1);
  });

  test('renders the multi action button', () => {
    const multiActionBtn = findByTestAttr(wrapper, 'multiple-action-btn');
    expect(multiActionBtn.length).toBe(1);
  });

  test('renders two menu items (actions)', () => {
    const actionMenuItems = findByTestAttr(wrapper, 'action-btn-menu-item');
    expect(actionMenuItems.length).toBe(2);
  });
});