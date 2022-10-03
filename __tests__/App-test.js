// //import 'react-native';
// import React from 'react';
// import App from '../App';
// import { render } from '@testing-library/react-native'; 
// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// import LoginScreen from '../src/screens/LoginScreen';
// import ApprenticeshipScreen from '../src/screens/ApprenticeshipScreen'

// describe('All screens', () => {
//   it('renders the screens', () => {
//     expect(true).toBeTruthy()
//   })
// })
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import ApprenticeshipScreen from '../src/screens/ApprenticeshipScreen';
import LoginScreen from '../src/screens/LoginScreen';
import SampleScreen from '../src/screens/SampleScreen';
import {useAuth0} from "@auth0/auth0-spa-js";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

jest.mock("@auth0/auth0-spa-js")

// test('renders correctly', () => {
//   const page = render(<SampleScreen/>)
//   const course = page.getByTestId('sampleText');
// });

describe("First test", () => {
  // beforeEach(() => {
  //   // Mock the Auth0 hook and make it return a logged in state
  //   useAuth0.mockReturnValue({
  //     isAuthenticated: true,
  //     user,
  //     logout: jest.fn(),
  //     loginWithRedirect: jest.fn()
  //   });
  // });

  it("renders without crashing", () => {
  const page = render(<SampleScreen/>)
  const course = page.getByTestId('sampleText');
  });
});
