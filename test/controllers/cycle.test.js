const { getCycles } = require('../../routes/api/controllers/cycles');
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
            let dbCallCycle = sandbox.stub(Cycle, "find").returns({sort:sandbox.stub().returns(fakeCycles)});

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
            expect(res.status.calledWith(badCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true
        });
        it('should handle error if database call throws error', async () => {
            let req = mockRequest();
            let dbCallCycle = sandbox.stub(Cycle, "find").returns({sort:sandbox.stub().throws()});

            await getCycles(req, res)
            expect(dbCallCycle.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.send.calledOnce).to.be.true
        });
    })
})