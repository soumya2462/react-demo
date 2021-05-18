import '@testing-library/jest-dom';
import { configure } from "enzyme";
/*TODO Replace this adapter with official enzyme adapter when version 17 becomes available */
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new EnzymeAdapter() });

