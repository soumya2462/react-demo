import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import CreatePackage from './EditSite';
import { findByTestAttr, storeFactory } from '../../utilities/test';

const setup = () =>{
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <CreatePackage/>
      </MemoryRouter>
    </Provider>
  );
}


describe('', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const initialState = {     
    };
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  
  test('renders site setup component without error', () => {
    const component = findByTestAttr(wrapper, 'component-site-setup');
    expect(component.exists()).toBe(true);
  });
  
});

 