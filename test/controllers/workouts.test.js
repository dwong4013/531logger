const { createWorkouts } = require('../../routes/api/controllers/workouts');
const expect = require('chai').expect;
const sinon = require('sinon');
const Cycle = require('../../models/Cycle');
const Workout = require('../../models/Workout');


describe('API: Cycles Controllers', () => {
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

    // describe('get cycles route controller: getCycles', () => {
    //     const mockRequest = () => {
    //         const req = {
    //             user: {
    //               id: '604f7c8d31c4ab00aaca213d'  
    //             }
    //         };

    //         return req
    //     }

    //     const mockCycles = () => {
    //         return [{
    //             id: 'sadfjsa0183',
    //             maxes: {
    //                 squat: 200,
    //                 bench: 200,
    //                 deadlift: 200,
    //                 press: 200
    //             }
    //         },
    //         {
    //             id: 'sadfjsdf183',
    //             maxes: {
    //                 squat: 200,
    //                 bench: 200,
    //                 deadlift: 200,
    //                 press: 200
    //             }
    //         }]
    //     }

    //     it('should get cycles from db and send to client', async () => {
    //         let req = mockRequest();
    //         let fakeCycles = mockCycles();
    //         let dbCallCycle = sandbox.stub(Cycle, "find").returns({sort:sandbox.stub().returns(fakeCycles)});

    //         await getCycles(req, res);
    //         expect(dbCallCycle.calledOnce).to.be.true;
    //         expect(res.json.calledOnce).to.be.true
    //         expect(res.json.calledWith(fakeCycles)).to.be.true;
    //     });

    //     it('should handle error if database call throws error', async () => {
    //         let req = mockRequest();
    //         let dbCallCycle = sandbox.stub(Cycle, "find").returns({sort:sandbox.stub().returns(undefined)});

    //         await getCycles(req, res)
    //         expect(dbCallCycle.calledOnce).to.be.true;
    //         expect(res.status.calledOnce).to.be.true
    //         expect(res.status.calledWith(badCode)).to.be.true;
    //         expect(res.json.calledOnce).to.be.true
    //     });
    //     it('should handle error if database call throws error', async () => {
    //         let req = mockRequest();
    //         let dbCallCycle = sandbox.stub(Cycle, "find").returns({sort:sandbox.stub().throws()});

    //         await getCycles(req, res)
    //         expect(dbCallCycle.calledOnce).to.be.true;
    //         expect(res.status.calledOnce).to.be.true
    //         expect(res.status.calledWith(errorCode)).to.be.true;
    //         expect(res.send.calledOnce).to.be.true
    //     });
    // })
    describe('create cycle route controller: createCycle', () => {
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
})