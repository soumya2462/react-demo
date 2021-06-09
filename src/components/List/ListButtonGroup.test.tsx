import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ListButtonGroup, { ListButtonGroupProps } from './ListButtonGroup';
import { findByTestAttr } from '../../utilities/test';

const setup = (props: ListButtonGroupProps) => {
  return shallow(
    <ListButtonGroup {...props} />
  );
}

describe('', () => {
  let wrapper: ShallowWrapper;
  const onDeleteMock = jest.fn();
  const onEditMock = jest.fn();

  const props = {
    onDeleteClick: onDeleteMock,
    onEditClick: onEditMock,
  }

  beforeEach(() => {
    wrapper = setup(props);
  });
  
  test('renders without errors', () => {  
    const component = findByTestAttr(wrapper, 'component-list-button-group');
    expect(component.length).toBe(1);
  });

  test('renders the edit button', () => {  
    const editBtn = findByTestAttr(wrapper, 'btn-group-edit');
    expect(editBtn.length).toBe(1);
  });

  test('edit button click event', () => {
    const editBtn = findByTestAttr(wrapper, 'btn-group-edit');
    editBtn.simulate('click');
    expect(onEditMock).toBeCalled();
  });

  test('renders the delete button', () => {  
    const deleteBtn = findByTestAttr(wrapper, 'btn-group-delete');
    expect(deleteBtn.length).toBe(1);
  });

  test('delete button click event', () => {
    const deleteBtn = findByTestAttr(wrapper, 'btn-group-delete');
    deleteBtn.simulate('click');
    expect(onDeleteMock).toBeCalled();
  });
});