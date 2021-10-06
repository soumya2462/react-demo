import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { findByTestAttr, storeFactory } from '../../../utilities/test';
import NumberFormat from './ReferenceNumberFormat';

const setup = () =>{
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <NumberFormat id="" updateParentValue={undefined} />
      </MemoryRouter>
    </Provider>
  );
}

describe('', () => {
  let wrapper: ReactWrapper;
  
  beforeEach(() => {   
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  
  test('renders number format component without error', () => {
    const component = findByTestAttr(wrapper, 'component-number-format');
    expect(component.exists()).toBe(true);
  });

  test('renders live prefix label without error', () => {
    const component = findByTestAttr(wrapper, 'live-prefix-label');
    expect(component.exists()).toBe(true);
  });

  test('renders live prefix textfield without error', () => {
    const component = findByTestAttr(wrapper, 'live-prefix-input');
    expect(component.exists()).toBe(true);
  });

  test('renders test prefix label without error', () => {
    const component = findByTestAttr(wrapper, 'test-prefix-label');
    expect(component.exists()).toBe(true);
  });

  test('renders test prefix textfield without error', () => {
    const component = findByTestAttr(wrapper, 'test-prefix-input');
    expect(component.exists()).toBe(true);
  });

  test('renders suffix label without error', () => {
    const component = findByTestAttr(wrapper, 'suffix-label');
    expect(component.exists()).toBe(true);
  });

  test('renders suffix textfield without error', () => {
    const component = findByTestAttr(wrapper, 'suffix-input');
    expect(component.exists()).toBe(true);
  });
    
  test('renders number padding label without error', () => {
    const component = findByTestAttr(wrapper, 'number-padding-label');
    expect(component.exists()).toBe(true);
  });

  test('renders number padding select field without error', () => {
    const component = findByTestAttr(wrapper, 'number-padding-input');
    expect(component.exists()).toBe(true);
  });
});
