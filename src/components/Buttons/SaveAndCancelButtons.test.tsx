import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SaveAndCancelButtons from './SaveAndCancelButtons';
import { findByTestAttr } from '../../utilities/test';

describe('Save and Cancel Buttons tests', () => {
  let wrapper: ShallowWrapper;
  const saveMock = jest.fn();
  const cancelMock = jest.fn();

  const defaultProps = {    
    handleSaveButton: saveMock,
    handleCancelButton: cancelMock,
  };

  const setup = () => shallow(<SaveAndCancelButtons saveButtonLabel={"Save test example"} {...defaultProps} />);

  beforeEach(() => {
    wrapper = setup();
  })

  test('renders button group without error', () => {
    const buttonGroup = findByTestAttr(wrapper, 'component-save-cancel-buttons');
    expect(buttonGroup.length).toBe(1);
  });

  test('renders save without error', () => {
    const buttonSave = findByTestAttr(wrapper, 'save-button');
    expect(buttonSave.exists()).toBe(true);
  });

  test('renders save label', () => {
    const buttonSave = findByTestAttr(wrapper, 'save-button');
    expect(buttonSave.text()).toBe('Save test example');
  });

  test('renders cancel without error', () => {
    const buttonCancel = findByTestAttr(wrapper, 'cancel-button');
    expect(buttonCancel.exists()).toBe(true);
  });

  test('save button click event', () => {  
    const saveButton = findByTestAttr(wrapper, 'save-button');
    saveButton.simulate('click');
    expect(saveMock).toBeCalled();
  });

  test('cancel button click event', () => {  
    const cancelButton = findByTestAttr(wrapper, 'cancel-button');
    cancelButton.simulate('click');
    expect(cancelMock).toBeCalled();
  });
});
