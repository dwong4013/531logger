import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/dom'
import { render, fireEvent, waitForElement, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
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
        data: 'asdofj1091jjksladf01asdf'
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
          cyclesCompleted: 0,
        }
      },
      getCycles: {
        response: {
            data: {
                status: 400,
                error: {
                    msg: 'No cycles found'
                }
            }
        }
      },
    }

    afterEach(() => jest.clearAllMocks())
  
    test('login and redirect to dashboard', async () => {
      axios.get = jest.fn().mockImplementationOnce(() => Promise.reject())

      // Render Landing and Register Routes, start at Landing
      const { getByText, getByTestId, getByPlaceholderText, getAllByPlaceholderText, getByRole, history } = renderApp();

      // See buttons to login or register
      expect(getByRole('link', {name: /login/i})).toBeTruthy();
      expect(getByRole('link', {name: /register/i})).toBeTruthy();

      // Navigate to Login
      const leftClick = { button: 0 }
      fireEvent.click(getByRole('link', {name: /login/i}), leftClick)

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
      axios.post = jest.fn().mockImplementationOnce(() => Promise.reject(res.postAuthError))
      fireEvent.click(getByRole('button', {name: /submit/i} ), leftClick);
      
      // Password error alert appears
      await waitForElement(()=>getByText(/invalid credentials/i));

      // Fill form with matching password
      fireEvent.change(getByPlaceholderText(/password/i), {target: {value: 'correctpassword'}})

      // Mock loaduser, getCycles
      axios.get = jest.fn()
      .mockImplementation((url) => {
          switch(url) {
              case '/api/auth':
                  return Promise.resolve(res.getAuth)
              case '/api/cycles':
                  return Promise.reject(res.getCycles);
          }
      });
      // mock loginUser
      axios.post = jest.fn().mockImplementationOnce(() => Promise.resolve(res.postAuthSuccess))
      
      // Click log in
      fireEvent.click(getByRole('button', {name: /submit/i} ), leftClick);

      // Redirected to dashboard
      await waitForElement(() => getByText(/logout/i));
      expect(window.location.href).toContain('http://localhost/dashboard');

    })
  })
})