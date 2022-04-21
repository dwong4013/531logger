const { getCycles, createCycle, editCycle, deleteCycle } = require('../../routes/api/controllers/cycles');
const expect = require('chai').expect;
const sinon = require('sinon');
const Cycle = require('../../models/Cycle');


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

    describe('get cycles route controller: getCycles', () => {
        const mockRequest = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                }
            };

            return req
        }

        const mockCycles = () => {
            return [{
                id: 'sadfjsa0183',
                maxes: {
                    squat: 200,
                    bench: 200,
                    deadlift: 200,
                    press: 200
                }
            },
            {
                id: 'sadfjsdf183',
                maxes: {
                    squat: 200,
                    bench: 200,
                    deadlift: 200,
                    press: 200
                }
            }]
        }

        it('should get cycles from db and send to client', async () => {
            let req = mockRequest();
            let fakeCycles = mockCycles();
            let dbCallCycle = sandbox.stub(Cycle, "find").returns({populate: sandbox.stub().returns({sort:sandbox.stub().returns(fakeCycles)})});

            await getCycles(req, res);
            expect(dbCallCycle.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true
            expect(res.json.calledWith(fakeCycles)).to.be.true;
        });

        it('should handle error if database call throws error', async () => {
            let req = mockRequest();
            let dbCallCycle = sandbox.stub(Cycle, "find").returns({sort:sandbox.stub().returns(undefined)});

            await getCycles(req, res)
            expect(dbCallCycle.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true
        });
        it('should handle error if database call throws error', async () => {
            let req = mockRequest();
            let dbCallCycle = sandbox.stub(Cycle, "find").returns({sort:sandbox.stub().throws()});

            await getCycles(req, res)
            expect(dbCallCycle.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true
        });
    })
    describe('create cycle route controller: createCycle', () => {
        const mockRequest = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                },
                body: {
                    squat: 200,
                    bench: 200,
                    deadlift: 200,
                    press: 200
                }
            };

            return req
        }

        const mockCycles = () => {
            return [{
                id: 'sadfjsa0183',
                maxes: {
                    squat: 200,
                    bench: 200,
                    deadlift: 200,
                    press: 200
                }
            },
            {
                id: 'sadfjsdf183',
                maxes: {
                    squat: 200,
                    bench: 200,
                    deadlift: 200,
                    press: 200
                }
            }]
        }

        it('should create and save new cycle to db', async () => {
            let req = mockRequest();
            let save = sandbox.stub(Cycle.prototype, 'save').callsFake(() => Promise.resolve(this))

            await createCycle(req, res);
            expect(save.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(goodCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })
        it('should handle error if save throws an error', async () => {
            let req = mockRequest();
            let save = sandbox.stub(Cycle.prototype, 'save').throws()

            await createCycle(req, res);
            expect(save.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })
    })
    describe('edit cycle route controller: editCycle', () => {
        const mockRequestStartDate = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                },
                body: {
                    key: 'startDate',
                    value: new Date(),
                },
                params: {
                    cycle_id: '604f7c8d11c4ab00aaca213d'
                }
            };

            return req
        }

        const mockRequestEndDate = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                },
                body: {
                    key: 'endDate',
                    value: new Date(),
                },
                params: {
                    cycle_id: '604f7c8d11c4ab00aaca213d'
                }
            };

            return req
        }

        const mockCycle = () => {
            return new Cycle({
                id: '604f7c8d31c4ab00aaca213d',
                maxes: {
                    squat: 200,
                    bench: 200,
                    deadlift: 200,
                    press: 200
                }
            })
        }

        const mockCycles = () => {
            return [new Cycle({
                id: '604f7c8d31c4ab00aaca213d',
                maxes: {
                    squat: 200,
                    bench: 200,
                    deadlift: 200,
                    press: 200
                }
            }),
            new Cycle({
                id: '604f7c8d31c4ab00aaca213d',
                maxes: {
                    squat: 200,
                    bench: 200,
                    deadlift: 200,
                    press: 200
                }
            })]
        }

        it('should make a change to startDate and save new cycle to db', async () => {
            let req = mockRequestStartDate();
            let fakeCycle = mockCycle();
            let fakeCycles = mockCycles();
            let dbFindOne = sandbox.stub(Cycle, 'findById').returns(fakeCycle)
            let save = sandbox.stub(Cycle.prototype, 'save').callsFake(() => Promise.resolve(this))

            await editCycle(req, res);
            expect(dbFindOne.calledOnce).to.be.true;
            expect(save.calledOnce).to.be.true;
            expect(save.calledOn(fakeCycle)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith(fakeCycles))
        })

        it('should make a change to endtDate and save new cycle to db', async () => {
            let req = mockRequestEndDate();
            let fakeCycle = mockCycle();
            let dbFindOne = sandbox.stub(Cycle, 'findById').returns(fakeCycle)
            let save = sandbox.stub(Cycle.prototype, 'save').callsFake(() => Promise.resolve(this))

            await editCycle(req, res);
            expect(dbFindOne.calledOnce).to.be.true;
            expect(save.calledOnce).to.be.true;
            expect(save.calledOn(fakeCycle)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith(fakeCycle))
        })

        it('should handle error if save throws an error', async () => {
            let req = mockRequestStartDate();
            let fakeCycle = mockCycle();
            let save = sandbox.stub(Cycle.prototype, 'save').throws()
            let dbFindOne = sandbox.stub(Cycle, 'findById').returns(fakeCycle)
            
            await editCycle(req, res);
            expect(dbFindOne.calledOnce).to.be.true;
            expect(save.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })

        it('should handle error if db call throws an error', async () => {
            let req = mockRequestStartDate();
            let dbFindOne = sandbox.stub(Cycle, 'findById').throws()
            
            await editCycle(req, res);
            expect(dbFindOne.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })
    })
        describe('deliete cycle route controller: deleteCycle', () => {
        const mockRequest = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                },
                params: {
                    cycle_id: '604f7c8d11c4ab00aaca213d'
                }
            };

            return req
        }


        const mockCycle = () => {
            return new Cycle({
                id: '604f7c8d31c4ab00aaca213d',
                maxes: {
                    squat: 200,
                    bench: 200,
                    deadlift: 200,
                    press: 200
                }
            })
        }

        it('should delete the requested cycle', async () => {
            let req = mockRequest();
            let fakeCycle = mockCycle();
            let dbFindById = sandbox.stub(Cycle, 'findById').returns(fakeCycle)
            let remove = sandbox.stub(Cycle.prototype, 'remove').callsFake(() => Promise.resolve(this))

            await deleteCycle(req, res);
            expect(dbFindById.calledOnce).to.be.true;
            expect(remove.calledOnce).to.be.true;
            expect(remove.calledOn(fakeCycle)).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(goodCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })

        it('should handle error when db call returns undefined', async () => {
            let req = mockRequest();
            let dbFindById = sandbox.stub(Cycle, 'findById').returns(undefined)

            await deleteCycle(req, res);
            expect(dbFindById.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(badCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })

        it('should handle error if remove throws an error', async () => {
            let req = mockRequest();
            let fakeCycle = mockCycle();
            let remove = sandbox.stub(Cycle.prototype, 'remove').throws()
            let dbFindById = sandbox.stub(Cycle, 'findById').returns(fakeCycle)
            
            await deleteCycle(req, res);
            expect(dbFindById.calledOnce).to.be.true;
            expect(remove.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })

        it('should handle error if db call throws an error', async () => {
            let req = mockRequest();
            let dbFindById = sandbox.stub(Cycle, 'findById').throws()
            
            await deleteCycle(req, res);
            expect(dbFindById.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })
    })
})