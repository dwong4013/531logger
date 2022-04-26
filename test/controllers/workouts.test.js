const { getWorkouts, createWorkouts, editWorkout, deleteWorkouts } = require('../../routes/api/controllers/workouts');
const expect = require('chai').expect;
const sinon = require('sinon');
const Cycle = require('../../models/Cycle');
const Workout = require('../../models/Workout');


describe('API: Workouts Controllers', () => {
    const mockResponse = () => {
        const res = {};
        res.statusCode = '';
        res.data = ()=> res;
        res.status = ()=> res;
        res.send = ()=> res;
        res.json = ()=> res;
        return res
      }
      
      const sandbox = sinon.createSandbox();
      let res = mockResponse();

      const goodCode = 200;
      const badCode = 400
      const errorCode = 500
    
    beforeEach(function(){
        sandbox.spy(res);
      })
  
    afterEach(function(){
        sandbox.restore();
    })

    describe('get workouts route controller: getWorkouts', () => {
        const mockRequest = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                },
                params: {
                    cycle_id: '604f7c8d31c4ab00aaca222d'
                }
            };

            return req
        }

        const mockWorkouts = () => {
            return [
                {name: 'fake workout1'},
                {name: 'fake workout2'},
                {name: 'fake workout3'}
            ]
        }

        it('should get workouts from db and send to client', async () => {
            let req = mockRequest();
            let fakeWorkouts = mockWorkouts();
            let findWorkouts = sandbox.stub(Workout, "find").returns(fakeWorkouts);

            await getWorkouts(req, res);
            expect(findWorkouts.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true
            expect(res.json.calledWith(fakeWorkouts)).to.be.true;
        });

        it('should handle error if database call throws error', async () => {
            let req = mockRequest();
            let findWorkouts = sandbox.stub(Workout, "find").throws();

            await getWorkouts(req, res)
            expect(findWorkouts.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.send.calledOnce).to.be.true
        });
        it('should handle error if database call returns undefined', async () => {
            let req = mockRequest();
            let findWorkouts = sandbox.stub(Workout, "find").returns(undefined);

            await getWorkouts(req, res)
            expect(findWorkouts.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true
            expect(res.status.calledWith(badCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true
        });
    })
    describe('create workouts route controller: createWorkouts', () => {
        const mockRequest = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                },
                params: {
                    cycle_id: '604f7c8d31c4ab00aaca222d'
                }
            };

            return req
        }

        const mockCycle = () => {
            return {
                id: '604f7c8d31c4ab00aaca222d',
                maxes: {
                    squat: 200,
                    bench: 200,
                    deadlift: 200,
                    press: 200
                }
            }
        }

        it('should create workouts', async () => {
            let req = mockRequest();
            let fakeCycle = mockCycle();
            let findCycle = sandbox.stub(Cycle, 'findById').returns(fakeCycle)
            let insertMany = sandbox.stub(Workout, 'insertMany').callsFake(() => Promise.resolve({result: {n: 12}}))

            await createWorkouts(req, res);
            expect(findCycle.calledOnce).to.be.true;
            expect(insertMany.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(goodCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({msg: '12 workouts created!'}))
        })

        it('should handle error if db call throws error', async () => {
            let req = mockRequest();
            let findCycle = sandbox.stub(Cycle, 'findById').throws()

            await createWorkouts(req, res);
            expect(findCycle.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.send.calledOnce).to.be.true;
        })

        it('should handle error if db insert throws error', async () => {
            let req = mockRequest();
            let fakeCycle = mockCycle();
            let findCycle = sandbox.stub(Cycle, 'findById').returns(fakeCycle)
            let insertMany = sandbox.stub(Workout, 'insertMany').throws()

            await createWorkouts(req, res);
            expect(findCycle.calledOnce).to.be.true;
            expect(insertMany.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.send.calledOnce).to.be.true;
        })

    })
    describe('edit workouts route controller: editWorkouts', () => {
        const mockRequestEdit = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                },
                params: {
                    workout_id: '604f7c8d31c4ab00aaca222d'
                },
                body: {
                    type: 'edit',
                    values: {
                        setType: 'mainSets',
                        id: '62434fdc25825c04bfb50561',
                        notes: 'it was easy',
                        time: '10:04am',
                        completed: true,
                    }
                }
            };

            return req
        }

        const mockRequestStatus = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                },
                params: {
                    workout_id: '604f7c8d31c4ab00aaca222d'
                },
                body: {
                    type: 'status',
                    values: {
                        completed: true,
                    }
                }
            };

            return req
        }

        const mockWorkout = () => {
            return {
                id: '604f7c8d31c4ab00aaca222d',
                completed: false,
                exercise: 'squat',
                week: 1,
                mainSets: ['1','2','3'],
                volumeSets: ['1','2','3','4','5']
            }
        }

        it('should edit workout details', async () => {
            let req = mockRequestEdit();
            const fakeWorkout = mockWorkout();
            let updateWorkout = sandbox.stub(Workout, 'findOneAndUpdate').returns(fakeWorkout)

            await editWorkout(req, res)
            expect(updateWorkout.calledOnce).to.be.true
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(goodCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({workout: fakeWorkout})).to.be.true;
            
        })

        it('should edit workout status', async () => {
            let req = mockRequestStatus();
            let updateWorkout = sandbox.stub(Workout, 'findOneAndUpdate').returns({ok: 1})

            await editWorkout(req, res)
            expect(updateWorkout.calledOnce).to.be.true
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(goodCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;

        })

        it('should handle error if db call throws error', async () => {
            let req = mockRequestStatus();
            let updateWorkout = sandbox.stub(Workout, 'findOneAndUpdate').throws()

            await editWorkout(req, res)
            expect(updateWorkout.calledOnce).to.be.true
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })

    })
    describe('delete workouts route controller: deleteWorkouts', () => {
        const mockRequest = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                },
                params: {
                    cycle_id: '604f7c8d31c4ab00aaca222d'
                },
            };

            return req
        }

        it('should delete workouts details', async () => {
            let req = mockRequest();
            let deleteMany = sandbox.stub(Workout, 'deleteMany').returns({ok: 1})

            await deleteWorkouts(req, res)
            expect(deleteMany.calledOnce).to.be.true
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(goodCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            
        })

        it('should handle error if db call throws error', async () => {
            let req = mockRequest();
            let deleteMany = sandbox.stub(Workout, 'deleteMany').throws()

            await deleteWorkouts(req, res)
            expect(deleteMany.calledOnce).to.be.true
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.send.calledOnce).to.be.true;
        })
    })
})