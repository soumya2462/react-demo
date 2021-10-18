import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ClaimStatuses from './ClaimStatuses';
import { findByTestAttr, storeFactory } from '../../../utilities/test';

const setup = () =>{
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <ClaimStatuses packageId=""/>
      </MemoryRouter>
    </Provider>
  );
}

describe('default behaviour with no claims statuses', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  
  test('renders add status button without error', () => {
    const component = findByTestAttr(wrapper, 'add-button');    
    expect(component.exists()).toBe(true);
  });

  test('renders save status button without error', () => {
    const component = findByTestAttr(wrapper, 'save-button');
    expect(component.exists()).toBe(true);
  });

  test('no status component rendered when no statuses exist', () => {
    const componentStatuses = findByTestAttr(wrapper, 'component-statuses');
    expect(componentStatuses.exists()).toBe(true);

    const statusesGroupBox = findByTestAttr(wrapper, 'statuses-group-box');
    expect(statusesGroupBox.exists()).toBe(false);

    const deleteStatusIcon = findByTestAttr(wrapper, 'delete-status-icon');
    expect(deleteStatusIcon.exists()).toBe(false);

    const claimStatusInput = findByTestAttr(wrapper, 'claim-status-input');
    expect(claimStatusInput.exists()).toBe(false);
  });
    
  test('add status button click event', () => {
    const component = findByTestAttr(wrapper, 'add-button');
    component.at(0).simulate('click');

    const componentStatuses = findByTestAttr(wrapper, 'component-statuses');
    expect(componentStatuses.exists()).toBe(true);

    const statusesGroupBox = findByTestAttr(wrapper, 'statuses-group-box');
    expect(statusesGroupBox.exists()).toBe(true);

    const deleteStatusIcon = findByTestAttr(wrapper, 'delete-status-icon');
    expect(deleteStatusIcon.exists()).toBe(true);

    const claimStatusInput = findByTestAttr(wrapper, 'claim-status-input');
    expect(claimStatusInput.exists()).toBe(true);
  }); 
  
});

