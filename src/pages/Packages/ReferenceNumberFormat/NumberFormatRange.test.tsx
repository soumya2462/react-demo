import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { findByTestAttr, storeFactory } from '../../../utilities/test';
import NumberFormatRange, { NumberFormatRangeProps } from './NumberFormatRange';

const mockCallBack = jest.fn();

const defaultNumberFormatRangeProps: NumberFormatRangeProps = {
  range: [],
  errorMessage: '',
  title: 'Test title',
  name: 'test',
  handleRangeAdd: mockCallBack,
  handleRangeRemove: mockCallBack,
  handleRangeChange: mockCallBack,
  handleErrorTextChange: mockCallBack,
};

const setup = (props = {}) => {
  const store = storeFactory({});
  const setupProps = {...defaultNumberFormatRangeProps, ...props};

  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <NumberFormatRange {...setupProps} />
      </MemoryRouter>
    </Provider>
  );
}

describe('default behaviour with no range props', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders key range label without error', () => {
    const component = findByTestAttr(wrapper, 'test-range-label');
    expect(component.exists()).toBe(true);
  });

  test('title text to match prop', () => {
    const component = findByTestAttr(wrapper, 'test-range-label');
    expect(component.first().text()).toBe('Test title');  
  });
      
  test('does not render key range start label', () => {
    const component = findByTestAttr(wrapper, 'test-range-start-label');
    expect(component.exists()).toBe(false);
  });

  test('does not render number range start textfield', () => {
    const component = findByTestAttr(wrapper, 'test-range-start-input');
    expect(component.exists()).toBe(false);
  });
  
  test('does not render number range end label', () => {
    const component = findByTestAttr(wrapper, 'test-range-end-label');
    expect(component.exists()).toBe(false);
  });

  test('does not render number range end textfield', () => {
    const component = findByTestAttr(wrapper, 'test-range-end-input');
    expect(component.exists()).toBe(false);
  });
  
  test('renders number range add button without error', () => {
    const component = findByTestAttr(wrapper, 'test-range-add');
    expect(component.exists()).toBe(true);
  });
    
  test('add range click event', () => {
    const component = findByTestAttr(wrapper, 'test-range-add');
    component.at(0).simulate('click');
    expect(mockCallBack).toBeCalled();
  });
  
  test('renders message if numbers outside range label without error', () => {
    const component = findByTestAttr(wrapper, 'message-if-tests-outside-range-label');
    expect(component.exists()).toBe(true);
  });
  
  test('renders message if numbers outside range textfield without error', () => {
    const component = findByTestAttr(wrapper, 'message-if-tests-outside-range-input');
    expect(component.exists()).toBe(true);
  });
});

describe('behaviour when range props is not empty', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({ range: [{ start: 1, end: 5}] });
  });

  afterEach(() => {
    wrapper.unmount();
  });
    
  test('renders key range start label', () => {
    const component = findByTestAttr(wrapper, 'test-range-start-label');
    expect(component.exists()).toBe(true);
  });

  test('renders number range start textfield', () => {
    const component = findByTestAttr(wrapper, 'test-range-start-input');
    expect(component.exists()).toBe(true);
  });
  
  test('renders number range end label', () => {
    const component = findByTestAttr(wrapper, 'test-range-end-label');
    expect(component.exists()).toBe(true);
  });

  test('renders number range end textfield', () => {
    const component = findByTestAttr(wrapper, 'test-range-end-input');
    expect(component.exists()).toBe(true);
  });
});