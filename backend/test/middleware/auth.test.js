const expect = require('chai').expect;
const ObjectID = require('mongodb').ObjectID;
const sinon = require('sinon');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');


describe('Middleware: auth', () => {
    const mockRequest = () => {
        const req = {};
        req.header = () => 'token'
        return req
      }

    const mockResponse = () => {
        const res = {};
        res.data = ()=> res;
        res.status = ()=> res;
        res.send = ()=> res;
        res.json = ()=> res;
        res.header = () => 'token'
        return res
      }
    const mockDecoded = () => ({
        user: {
            _id: new ObjectID(),
            name: 'mike',
            email: 'mike@mail.com',
        }
    })

    let sandbox = sinon.createSandbox();
      
    let res = mockResponse();
    let req = mockRequest();
    const next = sandbox.mock();
    let fakeDecoded = mockDecoded();
    let verifyToken = sandbox.stub(jwt, 'verify').returns(fakeDecoded)

    beforeEach(() => {
        sandbox.spy(res)
        sandbox.spy(req)
    })
    afterEach(() => sandbox.restore())

    it('should check header for token', () => {
        auth(req,res,next)
        expect(req.header.calledOnce).to.be.true;
    })
    it('should verify token and add user to request object', () => {
        auth(req,res,next)
        expect(verifyToken.calledOnce).to.be.true;
        expect(req.user).to.be.equal(fakeDecoded.user);
    })    
    it('should call next when done', () => {
        auth(req,res,next)
        expect(next.calledOnce).to.be.true;
    })
    it('should handle error if there is no token', () => {
        req.header = sandbox.stub().returns(undefined)
        auth(req,res,next)
        expect(res.status.calledOnce).to.be.true;
        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
    })
    it('should handle error if token verification throws', () => {
        verifyToken = sandbox.stub(jwt, 'verify').throws()
        auth(req,res,next)
        expect(res.status.calledOnce).to.be.true;
        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
    })
})

