import { ReactWrapper, ShallowWrapper } from 'enzyme';
import { createStore } from 'redux';
import { rootReducer } from '../store';

export const findByTestAttr = (wrapper: ShallowWrapper | ReactWrapper, val: string) => {
  return wrapper.find(`[data-test='${val}']`);
}

export const storeFactory = (initialState: any) => createStore(rootReducer, initialState);