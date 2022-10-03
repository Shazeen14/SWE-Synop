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


describe("User navigation", () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("renders apprenticeships without crashing", () => {
  const page = render(<ApprenticeshipScreen/>)
  });

  it("goes to quiz screen when topic chosen", () => {
    const navigation = {navigate: () => {}}
    spyOn(navigation, 'navigate');

    const page = render(<ApprenticeshipScreen navigation={navigation}/>)
    const courseButton = page.getByTestId('course1')
    fireEvent.press(courseButton)

    expect(navigation.navigate).toHaveBeenCalledWith("Quiz")
  })
});
