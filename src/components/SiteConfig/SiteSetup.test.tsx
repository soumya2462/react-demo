import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import SiteSetup, { SiteSetupProps } from './SiteSetup';
import { apiSite } from "../../constants/apiTypes";
import { findByTestAttr, storeFactory } from '../../utilities/test';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const mockApiSite: apiSite = {
  name: "",
  subDomain: "",
  id: "",
  siteId: "",
  audience: "undefined",
  clientId: "",
  packages: [],
  createdDate: {
    seconds: 0,
    nanos: 0,
  },
};

const saveMock = jest.fn();

const siteSetupDefaultProps = {    
  handleSaveSiteButton: saveMock,
  saveButtonLabel: "Save site test example", 
  pageTitle: "Create site test title", 
  validationError: "Test validation",
  passedInSite: mockApiSite,
};  

const setup = (props: SiteSetupProps ) =>{
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <SiteSetup 
          {...props} />
      </MemoryRouter>
    </Provider>
  );
}

describe('SiteSetup tests', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup(siteSetupDefaultProps);
  })
  
  test('renders component site setup without error', () => {
    const component = findByTestAttr(wrapper, 'component-site-setup');
    expect(component.exists()).toBe(true);
  });

  //Site details tests
  test('renders site details accordion header', () => {
    const component = findByTestAttr(wrapper, 'site-details-accordion-header');
    expect(component.exists()).toBe(true);
  });

  test('renders site details accordion label', () => {
    const component = findByTestAttr(wrapper, 'site-details-accordion-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site details accordion details', () => {
    const component = findByTestAttr(wrapper, 'site-details-accordion-details');
    expect(component.exists()).toBe(true);
  }); 

  test('renders site name label without error', () => {
    const component = findByTestAttr(wrapper, 'site-name-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site name textfield without error', () => {
    const component = findByTestAttr(wrapper, 'site-name-input');
    expect(component.exists()).toBe(true);
  });

  test('renders site subDomain textfield without error', () => {
    const component = findByTestAttr(wrapper, 'site-sub-domain-label');
    expect(component.exists()).toBe(true);
  });

  test('renders https label without error', () => {
    const component = findByTestAttr(wrapper, 'https-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site sub domain textfield without error', () => {
    const component = findByTestAttr(wrapper, 'site-sub-domain-input');
    expect(component.exists()).toBe(true);
  });

  test('renders instandaclaims label without error', () => {
    const component = findByTestAttr(wrapper, 'instandaclaims-label');
    expect(component.exists()).toBe(true);
  });

  test('renders validation', () => {
    const component = findByTestAttr(wrapper, 'site-details-validation');
    expect(component.exists()).toBe(true);
  });

  test('validation text to match prop', () => {
    const component = findByTestAttr(wrapper, 'site-details-validation');
    expect(component.first().text()).toBe('Test validation');  
  });

  //Site packages tests
  test('renders site packages accordion header', () => {
    const component = findByTestAttr(wrapper, 'site-packages-accordion-header');
    expect(component.exists()).toBe(true);
  });

  test('renders site packages accordion label', () => {
    const component = findByTestAttr(wrapper, 'site-packages-accordion-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site packages accordion details', () => {
    const component = findByTestAttr(wrapper, 'site-packages-accordion-details');
    expect(component.exists()).toBe(true);
  }); 

  test('renders site packages label without error', () => {
    const component = findByTestAttr(wrapper, 'site-packages-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site packages radio group without error', () => {
    const component = findByTestAttr(wrapper, 'site-packages-radiogroup');
    expect(component.exists()).toBe(true);
  });

  test('renders site packages all form control label without error', () => {
    const component = findByTestAttr(wrapper, 'site-packages-all-form-control-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site packages all radio without error', () => {
    const component = findByTestAttr(wrapper, 'site-packages-all-radio');
    expect(component.exists()).toBe(true);
  });

  test('renders site packages all label without error', () => {
    const component = findByTestAttr(wrapper, 'site-packages-all-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site packages some form control label without error', () => {
    const component = findByTestAttr(wrapper, 'site-packages-some-form-control-label');
    expect(component.exists()).toBe(true);
  });
  
  test('renders site packages some radio without error', () => {
    const component = findByTestAttr(wrapper, 'site-packages-some-radio');
    expect(component.exists()).toBe(true);
  });

  test('renders site packages some label without error', () => {
    const component = findByTestAttr(wrapper, 'site-packages-some-label');
    expect(component.exists()).toBe(true);
  });
  
  test('renders site audience accordion header', () => {
    const component = findByTestAttr(wrapper, 'site-audience-header');
    expect(component.exists()).toBe(true);
  });

  test('renders site audience accordion label', () => {
    const component = findByTestAttr(wrapper, 'site-audience-accordion-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site audience accordion details', () => {
    const component = findByTestAttr(wrapper, 'site-audience-accordion-details');
    expect(component.exists()).toBe(true);
  });

  test('renders site audience label', () => {
    const component = findByTestAttr(wrapper, 'site-audience-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site audience radio group', () => {
    const component = findByTestAttr(wrapper, 'site-audience-radiogroup');
    expect(component.exists()).toBe(true);
  });

  test('renders site audience agent label', () => {
    const component = findByTestAttr(wrapper, 'site-audience-agent-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site audience public label', () => {
    const component = findByTestAttr(wrapper, 'site-audience-public-label');
    expect(component.exists()).toBe(true);
  });

  test('renders site audience agent radio', () => {
    const component = findByTestAttr(wrapper, 'site-audience-agent-radio');
    expect(component.exists()).toBe(true);
  });

  test('renders site audience public radio', () => {
    const component = findByTestAttr(wrapper, 'site-audience-public-radio');
    expect(component.exists()).toBe(true);
  });
 
  test('renders buttons without error', () => {
    const component = findByTestAttr(wrapper, 'save-cancel-buttons');
    expect(component.exists()).toBe(true);
  });
});

test('renders validation', () => {
  siteSetupDefaultProps.validationError = "";
  const wrapper = setup(siteSetupDefaultProps);
  const component = findByTestAttr(wrapper, 'site-details-validation');
  expect(component.exists()).toBe(false);
});

