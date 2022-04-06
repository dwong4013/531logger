import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement, waitForElementToBeRemoved } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from '../../store';
import axios from 'axios';

// Components
import App from '../../App';

describe('Landing', () => {
  describe('register a new account', () => {

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
    
    const renderApp = () => {
      let utils = render(<App/>)
      return {...utils, history}
    }

    const res = {
      postUsersSuccess: {
        data: {
          token: 'asdofj1091jjksladf01asdf'
        }
      },
      getAuth: {
        data: {
          _id: '0s9adf808sadfa0sdf8',
          name: 'fake',
          email: 'fake@mail.com',
        }
      },
    }

    // Mock registration post request
    axios.post = jest.fn()
    .mockImplementationOnce(() => Promise.resolve(res.postUsersSuccess))

    axios.get = jest.fn()
    .mockImplementationOnce(() => Promise.reject())
    .mockImplementationOnce(() => Promise.resolve(res.getAuth))

  
    test('register and redirect to dashboard', async () => {

        // Render Landing and Register Routes, start at Landing
        const { getByText, getByTestId, getByPlaceholderText, getAllByPlaceholderText, getByRole, history } = renderApp();

        // See buttons to login or register
        expect(getByText(/login/i)).toBeTruthy();
        expect(getByText(/register/i)).toBeTruthy();

        // Navigate to Register
        const leftClick = { button: 0 }
        fireEvent.click(getByText(/register/i), leftClick)

        // Arrived at Register page
        console.log('url: ', window.location.href)
        expect(window.location.href).toContain('http://localhost/register');
        expect(getByText(/new account/i)).toBeTruthy();
        // See registration form
        expect(getByPlaceholderText(/name/i)).toBeTruthy();
        expect(getByPlaceholderText(/email/i)).toBeTruthy();
        expect(getAllByPlaceholderText(/password/i)).toBeTruthy();
        expect(getByRole('button', {name: /submit/i} )).toBeTruthy();
        
        // Fill form with not matching passwords
        fireEvent.change(getByPlaceholderText(/name/i), {target: {value: 'fake'}})
        fireEvent.change(getByPlaceholderText(/email/i), {target: {value: 'fake@mail.com'}})
        fireEvent.change(getByPlaceholderText('Password'), {target: {value: 'test123'}})
        fireEvent.change(getByPlaceholderText('Re-enter Password'), {target: {value: 'different'}})
        
        // Click sign up
        fireEvent.click(getByRole('button', {name: /submit/i} ), leftClick);
        
        // Password error alert appears
        await waitForElement(()=>getByText(/passwords do not match/i));

        // Fill form with matching password
        fireEvent.change(getByPlaceholderText('Re-enter Password'), {target: {value: 'test123'}})

        // Click sign up
        fireEvent.click(getByRole('button', {name: /submit/i} ), leftClick);

        // Redirected to company setup
        await waitForElement(() => getByText(/cycles completed/i));
        expect(window.location.href).toContain('http://localhost/dashboard');

    })
  })
})