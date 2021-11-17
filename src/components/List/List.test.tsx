import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import List from './List';
import { findByTestAttr } from '../../utilities/test';

const setup = (createLabel: string) => {
  return shallow(
    <List {...{createLabel}}>
      <div data-test="list-row-child">test</div>
    </List>
  );
}

describe('Only mandatory props, data without columns', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup('Create Test');
  });
  
  test('renders without errors', () => {
    const component = findByTestAttr(wrapper, 'component-list');
    expect(component.length).toBe(1);
  });

  test('renders create btn', () => {
    const btn = findByTestAttr(wrapper, 'list-create-btn');
    expect(btn.length).toBe(1);
  });

  test('create btn name from props', () => {
    const btn = findByTestAttr(wrapper, 'list-create-btn');
    expect(btn.text()).toBe('Create Test');
  });

  test('renders children', () => {
    const child = findByTestAttr(wrapper, 'list-row-child');
    expect(child.length).toBe(1);
  });

  test('renders sort', () => {  
    const component = findByTestAttr(wrapper, 'list-sort');
    expect(component.length).toBe(1);
  });
  
  test('renders search', () => {  
    const component = findByTestAttr(wrapper, 'list-search');
    expect(component.length).toBe(1);
  });
});