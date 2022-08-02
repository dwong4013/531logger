import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/dom'
import { render, fireEvent, waitForElement, act } from '@testing-library/react';
import axios from 'axios';

// Components
import App from '../../App';

describe('Workout', () => {
  describe('Complete a workout', () => {

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
      getAuth: {
        data: {
          _id: '0s9adf808sadfa0sdf8',
          name: 'fake',
          email: 'fake@mail.com',
          cyclesCompleted: 0,
        }
      },
      getCycles: {
        data: [{
            _id: '6263089b801f9c06810c1ddf',
            user: '624de9fa6926a5051d0cf9b0',
            completed: false,
            workoutsToDo: [
                {
                  _id: '6263089b801f9c06810c1de0',
                  exercise: 'squat',
                  week: 1
                },
                {
                  _id: '6263089b801f9c06810c1de9',
                  exercise: 'bench',
                  week: 1
                },
                {
                  _id: '6263089b801f9c06810c1df2',
                  exercise: 'deadlift',
                  week: 1
                },
                {
                  _id: '6263089b801f9c06810c1dfb',
                  exercise: 'press',
                  week: 1
                },
                {
                  _id: '6263089b801f9c06810c1e04',
                  exercise: 'squat',
                  week: 2
                },
                {
                  _id: '6263089b801f9c06810c1e0d',
                  exercise: 'bench',
                  week: 2
                },
                {
                  _id: '6263089b801f9c06810c1e16',
                  exercise: 'deadlift',
                  week: 2
                },
                {
                  _id: '6263089b801f9c06810c1e1f',
                  exercise: 'press',
                  week: 2
                },
                {
                  _id: '6263089b801f9c06810c1e28',
                  exercise: 'squat',
                  week: 3
                },
                {
                  _id: '6263089b801f9c06810c1e31',
                  exercise: 'bench',
                  week: 3
                },
                {
                  _id: '6263089b801f9c06810c1e3a',
                  exercise: 'deadlift',
                  week: 3
                },
                {
                  _id: '6263089b801f9c06810c1e43',
                  exercise: 'press',
                  week: 3
                }
              ],
              workoutsCompleted: [],
            maxes: {
                squat: 200,
                bench: 150,
                deadlift: 300,
                press: 100
            }
        }]
      },
      getWorkout: {
          data: [{
                  completed: false,
                  _id: '6263089b801f9c06810c1de0',
                  cycle: '6263089b801f9c06810c1ddf',
                  user: '624de9fa6926a5051d0cf9b0',
                  exercise: 'squat',
                  week: 1,
                  mainSets: [
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1de1',
                      weight: 115,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1de2',
                      weight: 135,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1de3',
                      weight: 155,
                      reps: 5,
                    }
                  ],
                  volumeSets: [
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1de4',
                      weight: 115,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1de5',
                      weight: 115,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1de6',
                      weight: 115,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1de7',
                      weight: 115,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1de8',
                      weight: 115,
                      reps: 5,
                    }
                  ],
                  __v: 0
                },
                {
                  completed: false,
                  _id: '6263089b801f9c06810c1de9',
                  cycle: '6263089b801f9c06810c1ddf',
                  user: '624de9fa6926a5051d0cf9b0',
                  exercise: 'bench',
                  week: 1,
                  mainSets: [
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1dea',
                      weight: 90,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1deb',
                      weight: 100,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1dec',
                      weight: 115,
                      reps: 5,
                    }
                  ],
                  volumeSets: [
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1ded',
                      weight: 90,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1dee',
                      weight: 90,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1def',
                      weight: 90,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1df0',
                      weight: 90,
                      reps: 5,
                    },
                    {
                      missed: false,
                      completed: false,
                      _id: '6263089b801f9c06810c1df1',
                      weight: 90,
                      reps: 5,
                    }
                  ],
                 __v: 0
                },
                {
                  completed: false,
                  _id: '6263089b801f9c06810c1df2',
                  cycle: '6263089b801f9c06810c1ddf',
                  user: '624de9fa6926a5051d0cf9b0',
                  exercise: 'deadlift',
                  week: 1,
                  mainSets: [],
                  volumeSets: [],
                  __v: 0
                },
                {
                  completed: false,
                  _id: '6263089b801f9c06810c1dfb',
                  cycle: '6263089b801f9c06810c1ddf',
                  user: '624de9fa6926a5051d0cf9b0',
                  exercise: 'press',
                  week: 1,
                  mainSets: [],
                  volumeSets: [],
                  __v: 0
                },
                {
                    completed: false,
                    _id: '6263089b801f9c06810c1e04',
                    cycle: '6263089b801f9c06810c1ddf',
                    user: '624de9fa6926a5051d0cf9b0',
                    exercise: 'squat',
                    week: 2,
                    mainSets: [],
                    volumeSets: [],
                    __v: 0
                    },
                    {
                    completed: false,
                    _id: '6263089b801f9c06810c1e0d',
                    cycle: '6263089b801f9c06810c1ddf',
                    user: '624de9fa6926a5051d0cf9b0',
                    exercise: 'bench',
                    week: 2,
                    mainSets: [],
                    volumeSets: [],
                    __v: 0
                    },
                    {
                    completed: false,
                    _id: '6263089b801f9c06810c1e16',
                    cycle: '6263089b801f9c06810c1ddf',
                    user: '624de9fa6926a5051d0cf9b0',
                    exercise: 'deadlift',
                    week: 2,
                    mainSets: [],
                    volumeSets: [],
                    __v: 0
                    },
                    {
                    completed: false,
                    _id: '6263089b801f9c06810c1e1f',
                    cycle: '6263089b801f9c06810c1ddf',
                    user: '624de9fa6926a5051d0cf9b0',
                    exercise: 'press',
                    week: 2,
                    mainSets: [],
                    volumeSets: [],
                    __v: 0
                    },
                    {
                    completed: false,
                    _id: '6263089b801f9c06810c1e28',
                    cycle: '6263089b801f9c06810c1ddf',
                    user: '624de9fa6926a5051d0cf9b0',
                    exercise: 'squat',
                    week: 3,
                    mainSets: [],
                    volumeSets: [],
                    __v: 0
                    },
                    {
                    completed: false,
                    _id: '6263089b801f9c06810c1e31',
                    cycle: '6263089b801f9c06810c1ddf',
                    user: '624de9fa6926a5051d0cf9b0',
                    exercise: 'bench',
                    week: 3,
                    mainSets: [],
                    volumeSets: [],
                    __v: 0
                    },
                    {
                    completed: false,
                    _id: '6263089b801f9c06810c1e3a',
                    cycle: '6263089b801f9c06810c1ddf',
                    user: '624de9fa6926a5051d0cf9b0',
                    exercise: 'deadlift',
                    week: 3,
                    mainSets: [],
                    volumeSets: [],
                    __v: 0
                    },
                    {
                    completed: false,
                    _id: '6263089b801f9c06810c1e43',
                    cycle: '6263089b801f9c06810c1ddf',
                    user: '624de9fa6926a5051d0cf9b0',
                    exercise: 'press',
                    week: 3,
                    mainSets: [],
                    volumeSets: [],
                    __v: 0
             
          }]
      },

    }
    
    beforeEach(() => jest.restoreAllMocks())
    afterEach(() => jest.restoreAllMocks())
  
    test('complete a workout', async () => {
        // Mock loaduser, getCycles
        axios.get = jest.fn()
        .mockImplementation((url) => {
            switch(url) {
                case '/api/auth':
                    return Promise.resolve(res.getAuth)
                case '/api/cycles':
                    return Promise.resolve(res.getCycles);
                case `/api/workouts/${res.getCycles.data[0]._id}`:
                    return Promise.resolve(res.getWorkout);
            }
        });

        // Render Landing and Register Routes, start at Landing
        const { getByText, getAllByText, getByTestId, getByPlaceholderText, getAllByPlaceholderText, getByRole, history } = renderApp();

        // See buttons to login or register
        expect(getByRole('link', {name: /login/i})).toBeTruthy();
        expect(getByRole('link', {name: /register/i})).toBeTruthy();

        // Navigate to Login
        const leftClick = { button: 0 }
        fireEvent.click(getByRole('link', {name: /login/i}), leftClick)
        
        // Redirected to dashboard setup
        await waitForElement(() => getByText(/logout/i));
        expect(window.location.href).toContain('http://localhost/dashboard');

        // See a cycle
        expect(getByRole('link', {name: 'workout'})).toBeTruthy();
        fireEvent.click(getByRole('link', {name: 'workout'}), leftClick)
        
        // See workout page
        await waitForElement(() => getByText('Main Sets'));
        expect(getByText('Volume Sets')).toBeTruthy();
        expect(window.location.href).toContain(`http://localhost/workout/${res.getCycles.data[0]._id}`)
        expect(getByText(/squat max/i)).toBeTruthy();
        expect(getByRole('combobox')).toBeTruthy();

        // See dropdown with all 12 workout options
        const currentCycle = res.getCycles.data[0]
        currentCycle.workoutsToDo.forEach((workout) => {
            expect(getByRole('option', {name: new RegExp(`week ${workout.week}: ${workout.exercise}`,'i')})).toBeTruthy();
        })

        // Select each workout and see the first set weight
        res.getWorkout.data.forEach(async (workout,i) => {
            fireEvent.change(getByRole('combobox'), {target: { value: `${workout._id}`}})
            await waitForElement(() => getByText(new RegExp(workout.exercise, 'i')))
            let elements = getAllByText(new RegExp(`${workout.mainSets[0].weight}`),'i')
            expect(elements.length).toBe(2);
        })

        // Select Week 1 Bench
        fireEvent.change(getByRole('combobox'), {target: {value: '6263089b801f9c06810c1de0'}})

        // See max changes
        await waitForElement(() => getByText(/squat max/i));

        // Test actions
        let currentWorkout = res.getWorkout.data[0]
        expect(currentWorkout.exercise).toBe('squat')
        // Complete main sets
        currentWorkout.mainSets.forEach(async (set, i) => {
          // Enter notes
            let notes = `main set ${i+1}`
            const notesField = getByRole('textbox')
            fireEvent.change(notesField, {target: { value: notes}})
            expect(notesField).toHaveValue(notes)
            let updatedSet = {
                ...set,
                time: new Date().toLocaleTimeString(),
                notes,
                completed: true
            }
            // build new main sets array
            let updatedMainSets = currentWorkout.mainSets.map(el => {
                if (el._id === set._id) {
                    return updatedSet
                } else {
                    return el
                }
            })
            currentWorkout.mainSets = updatedMainSets
            axios.put = jest.fn().mockImplementationOnce(() => Promise.resolve({data: {workout: currentWorkout}}))
            // Click complete button
            fireEvent.click(getByRole('button', {name: /complete/i}),leftClick)
            // Notes field reset to blank
            expect(getByText(notes)).toBeTruthy();
            expect(notesField).toHaveValue('');
        })

        // Complete volume sets
        currentWorkout.volumeSets.forEach(async (set, i) => {
          // Enter notes
            let notes = `volume set ${i+1}`
            const notesField = getByRole('textbox')
            fireEvent.change(notesField, {target: { value: notes}})
            expect(notesField).toHaveValue(notes)
            let updatedSet = {
                ...set,
                time: new Date().toLocaleTimeString(),
                notes,
                completed: true
            }
            // build new volue sets array
            let updatedvolumeSets = currentWorkout.volumeSets.map((el) => {
                if (el._id === set._id) {
                    return updatedSet
                } else {
                    return el
                }
            })
            if (i === 4) {
                currentWorkout.completed = true;
            }
            currentWorkout.volumeSets = updatedvolumeSets
            axios.put = jest.fn().mockImplementationOnce(() => Promise.resolve({data: {workout: currentWorkout}}))
            // Click complete button
            fireEvent.click(getByRole('button', {name: /complete/i}),leftClick)
            // Notes field reset to blank
            expect(getByText(notes)).toBeTruthy();
            if (!currentWorkout.completed) {
              expect(notesField).toHaveValue('');
            }
        })

        // See completed workout
        await waitForElement(() => getByText('Workout Completed!'))
        expect(getByText('Workout Completed!')).toBeTruthy();
         
    })
  })
})