import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ListRow, { ListRowProps } from './ListRow';
import { findByTestAttr } from '../../utilities/test';
import { AccessibleForwardOutlined } from '@material-ui/icons';

const setup = (props: ListRowProps) => {
  return shallow(<ListRow {...props} />);
};

describe('Only mandatory props, data without columns', () => {
  let wrapper: ShallowWrapper;

  const props = {
    data: {
      id: '75bc9cbc-a8fe-471f-86d0-5455c2b5e2ab',
      name: 'row name',
      columns: [],
    },
  };

  beforeEach(() => {
    wrapper = setup(props);
  });

  test('renders without errors', () => {
    const component = findByTestAttr(wrapper, 'component-list-row');
    expect(component.length).toBe(1);
  });

  test('renders the name', () => {
    const name = findByTestAttr(wrapper, 'list-row-name');
    expect(name.length).toBe(1);
  });

  test('rendered name is same as props', () => {
    const name = findByTestAttr(wrapper, 'list-row-name');
    expect(name.text()).toBe('row name');
  });

  test('does not render the icon', () => {
    const icon = findByTestAttr(wrapper, 'list-row-icon');
    expect(icon.length).toBe(0);
  });

  test('does not render any column', () => {
    const columns = findByTestAttr(wrapper, 'list-row-map-column');
    expect(columns.length).toBe(0);
  });
});

describe('Only mandatory props, but data with columns', () => {
  let wrapper: ShallowWrapper;

  const props = {
    data: {
      id: '75bc9cbc-a8fe-471f-86d0-5455c2b5e2ab',
      name: 'second name',
      columns: ['col1', 'col2'],
    },
  };

  beforeEach(() => {
    wrapper = setup(props);
  });

  test('renders without errors', () => {
    const component = findByTestAttr(wrapper, 'component-list-row');
    expect(component.length).toBe(1);
  });

  test('renders the name', () => {
    const name = findByTestAttr(wrapper, 'list-row-name');
    expect(name.length).toBe(1);
  });

  test('rendered name is same as props', () => {
    const name = findByTestAttr(wrapper, 'list-row-name');
    expect(name.text()).toBe('second name');
  });

  test('does not render the icon', () => {
    const icon = findByTestAttr(wrapper, 'list-row-icon');
    expect(icon.length).toBe(0);
  });

  test('renders 2 columns', () => {
    const columns = findByTestAttr(wrapper, 'list-row-map-column');
    expect(columns.length).toBe(2);
  });

  test('rendered columns are same as props', () => {
    const columns = findByTestAttr(wrapper, 'list-row-map-column');
    expect(columns.at(0).text()).toBe('col1');
    expect(columns.at(1).text()).toBe('col2');
  });
});

describe('All props', () => {
  const mockEditClick = jest.fn();
  const props = {
    data: {
      id: '75bc9cbc-a8fe-471f-86d0-5455c2b5e2ab',
      name: 'last name',
      columns: ['col1'],
    },
    icon: <AccessibleForwardOutlined />,
    onEditClick: mockEditClick,
  };

  const wrapper = shallow(<ListRow {...props} />);

  test('renders without errors', () => {
    const component = findByTestAttr(wrapper, 'component-list-row');
    expect(component.length).toBe(1);
  });

  test('renders the icon', () => {
    const icon = findByTestAttr(wrapper, 'list-row-icon');
    expect(icon.length).toBe(1);
  });

  test('renders the name', () => {
    const name = findByTestAttr(wrapper, 'list-row-name');
    expect(name.length).toBe(1);
  });

  test('rendered name is same as props', () => {
    const name = findByTestAttr(wrapper, 'list-row-name');
    expect(name.text()).toBe('last name');
  });

  test('renders one column', () => {
    const column = findByTestAttr(wrapper, 'list-row-map-column');
    expect(column.length).toBe(1);
  });

  test('rendered column is same as props', () => {
    const column = findByTestAttr(wrapper, 'list-row-map-column');
    expect(column.text()).toBe('col1');
  });

  test('name click works', () => {
    const name = findByTestAttr(wrapper, 'list-row-name');
    name.simulate('click');
    expect(mockEditClick).toBeCalled();
  });
});
