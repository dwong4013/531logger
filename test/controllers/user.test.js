const { registerUser, editUser } = require('../../routes/api/controllers/users');
const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


describe('API: User Controllers', () => {
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

    describe('regsiter route controller: registerUser', () => {
        const mockRequest = () => {
            const req = {
                body: {
                    name: 'mike',
                    email: 'fake@email.com',
                    password: 'goodpassword'
                }
            }
            return req
        }

        const mockUser = () => {
            return {
                id: '604f7c8d31c4ab00aaca213d',
                name: 'mike',
                email: 'fake@email.com',
            }
        }
        const mockToken = () => 'aslkfjlsajfs09f8sflxzlcvjxv'
        const mockSalt = () => 'asldjf;sakfljsda;f'

        it('should create a user and send token', async () => {
            let req = mockRequest();
            let fakeUser = mockUser();
            let fakeToken = mockToken();
            let fakeSalt = mockSalt();
            let dbUserCall = sandbox.stub(User, 'findOne').returns(undefined);
            let save = sandbox.stub(User.prototype, 'save').callsFake(() => Promise.resolve(this))
            let genSalt = sandbox.stub(bcrypt, 'genSalt').callsFake(() => Promise.resolve(fakeSalt))
            let hash = sandbox.stub(bcrypt, 'hash').callsFake(() => Promise.resolve('newhash'))
            let signJwt = sandbox.stub(jwt, 'sign').yields(null, fakeToken)

            await registerUser(req, res)
            expect(dbUserCall.calledOnce).to.be.true;
            expect(hash.calledOnce).to.be.true;
            expect(genSalt.calledOnce).to.be.true;
            expect(save.calledOnce).to.be.true;
            expect(signJwt.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({token: fakeToken})).to.be.true;


        });
        it('handles error when user db call throws an error', async () => {
            let req = mockRequest();
            let dbUserCall = sandbox.stub(User, 'findOne').throws();
            
            await registerUser(req,res);
            expect(dbUserCall.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })
    })
})