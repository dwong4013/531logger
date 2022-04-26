import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/dom'
import { render, fireEvent, waitForElement } from '@testing-library/react';
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
      postCycle: {
        data: {
            cycle: {
                _id: '62607be5ab7521076f156d33',
                user: '624de9fa6926a5051d0cf9b0',
                completed: false,
                workoutsToDo: [],
                workoutsCompleted: [],
                maxes: {
                    squat: 200,
                    bench: 150,
                    deadlift: 300,
                    press: 100
                }
            },
            msg: 'A new cycle has been created'
        }
      },
      postWorkouts: {
          data: {
              workouts: ['1','2','3','4','5']
          }
      },
      putCycle: {
        data: {
            _id: '62607be5ab7521076f156d33',
            user: '624de9fa6926a5051d0cf9b0',
            completed: false,
            workoutsToDo: ['1','2','3','4','5'],
            workoutsCompleted: [],
            maxes: {
                squat: 200,
                bench: 150,
                deadlift: 300,
                press: 100
            }
        }
      }
    }

    afterEach(() => jest.clearAllMocks())
  
    test('login and create a new cycle', async () => {

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
        
        // Fill form with credentials
        fireEvent.change(getByPlaceholderText(/email/i), {target: {value: 'fake@mail.com'}})
        fireEvent.change(getByPlaceholderText(/password/i), {target: {value: 'password123'}})
        
        // mock get user
        axios.get = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.getAuth))
        // mock get cycles
        .mockImplementationOnce(() => Promise.reject(res.getCycles))
        // mock login user
        axios.post = jest.fn().mockImplementationOnce(() => Promise.resolve(res.postAuthSuccess))
        // Click sign up
        fireEvent.click(getByRole('button', {name: /submit/i} ), leftClick);
        
        // Redirected to company setup
        await waitForElement(() => getByText(/logout/i));
        expect(window.location.href).toContain('http://localhost/dashboard');

        // See no cycles
        expect(getByText(/no cycles available/i)).toBeTruthy();

        // See add (+) button
        expect(getByTestId('create-cycle-button')).toBeTruthy();
        fireEvent.click(getByTestId('create-cycle-button'), leftClick);

        // See modal
        await waitForElement(() => expect(getByText(/let\'s setup your maxes/i)))
        expect(getByRole('button', {name: /setup/i})).toBeTruthy();

        fireEvent.click(getByRole('button', {name: /setup/i}), leftClick);

        // See form to enter maxes
        const maxes = {
            squat: 200,
            bench: 150,
            deadlift: 300,
            press: 100
        }
        for (const exercise in maxes) {
            expect(getByRole('textbox', {name: new RegExp(exercise,'i')})).toBeTruthy();
        }

        // Fill out maxes
        for (const exercise in maxes) {
            fireEvent.change(getByRole('textbox', {name: new RegExp(exercise,'i')}), {target: {value: maxes[exercise]}})
        }
        fireEvent.click(getByRole('button', {name: 'submit'}), leftClick);

        // See Summary
        await waitForElement(() => expect(getByText(/your maxes for the next cycle/i)))
        for (const exercise in maxes) {
            expect(getByText(new RegExp(exercise,'i'))).toBeTruthy();
            expect(getByText(new RegExp(maxes[exercise],'i'))).toBeTruthy();
        }

        // Click create
        axios.post = jest.fn()
        .mockImplementation((url) => {
          switch (url) {
            case '/api/cycles':
              return Promise.resolve(res.postCycle);
            case `/api/workouts/${res.postCycle.data.cycle._id}`:
              return Promise.resolve(res.postWorkouts)
          }
        })        
        axios.put = jest.fn().mockImplementationOnce(() => Promise.resolve(res.putCycle))
        fireEvent.click(getByRole('button', {name: 'create'}), leftClick);

        // See new cycle is created
        await waitForElement(() => expect(getByText(res.postCycle.data.msg)))
        expect(getByRole('link', {name: 'workout'})).toBeTruthy();

    })
  })
})