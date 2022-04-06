import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement, waitForElementToBeRemoved } from '@testing-library/react';
import axios from 'axios';

// Components
import App from '../../App';

describe('Landing', () => {
  describe('login to an account', () => {

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
      postAuthSuccess: {
        data: {
          token: 'asdofj1091jjksladf01asdf'
        }
      },
      postAuthError: {
          response: {
              data: {
                  error: {
                      msg: 'Invalid Credentials'
                  }
              }
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
    .mockImplementationOnce(() => Promise.reject(res.postAuthError))
    .mockImplementationOnce(() => Promise.resolve(res.postAuthSuccess))

    axios.get = jest.fn()
    .mockImplementationOnce(() => Promise.reject())
    .mockImplementationOnce(() => Promise.resolve(res.getAuth))

  
    test('login and redirect to dashboard', async () => {

        // Render Landing and Register Routes, start at Landing
        const { getByText, getByTestId, getByPlaceholderText, getAllByPlaceholderText, getByRole, history } = renderApp();

        // See buttons to login or register
        expect(getByText(/login/i)).toBeTruthy();
        expect(getByText(/register/i)).toBeTruthy();

        // Navigate to Login
        const leftClick = { button: 0 }
        fireEvent.click(getByText(/login/i), leftClick)

        // Arrived at Login page
        expect(window.location.href).toContain('http://localhost/login');
        expect(getByText(/log into/i)).toBeTruthy();
        
        // See login form
        expect(getByPlaceholderText(/email/i)).toBeTruthy();
        expect(getAllByPlaceholderText(/password/i)).toBeTruthy();
        expect(getByRole('button', {name: /submit/i} )).toBeTruthy();
        
        // Fill form with invalid credentials
        fireEvent.change(getByPlaceholderText(/email/i), {target: {value: 'fake@mail.com'}})
        fireEvent.change(getByPlaceholderText(/password/i), {target: {value: 'wrongpassword'}})
        
        // Click sign up
        fireEvent.click(getByRole('button', {name: /submit/i} ), leftClick);
        
        // Password error alert appears
        await waitForElement(()=>getByText(/invalid credentials/i));

        // Fill form with matching password
        fireEvent.change(getByPlaceholderText(/password/i), {target: {value: 'correctpassword'}})

        // Click sign up
        fireEvent.click(getByRole('button', {name: /submit/i} ), leftClick);

        // Redirected to company setup
        await waitForElement(() => getByText(/cycles completed/i));
        expect(window.location.href).toContain('http://localhost/dashboard');

    })
  })
})