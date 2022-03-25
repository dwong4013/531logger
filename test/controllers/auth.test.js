const { getUser, loginUser } = require('../../routes/api/controllers/auth');
const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


describe('API: Auth Controllers', () => {
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

    describe('get user route controller: getUsers', () => {
        const mockRequest = () => {
            const req = {
                user: {
                  id: '604f7c8d31c4ab00aaca213d'  
                }
            };

            return req
        }

        const mockUser = () => {
            return {
                name: 'fake name',
                email: 'fake@email.com',
            }
        }

        it('should get user from db and send to client', async () => {
            let req = mockRequest();
            let fakeUser = mockUser();
            let dbCallUser = sandbox.stub(User, "findById").returns({select:sandbox.stub().returns(fakeUser)});

            await getUser(req, res);
            expect(dbCallUser.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true
            expect(res.json.calledWith(fakeUser)).to.be.true;
        });

        it('should handle error if database call throws error', async () => {
            let req = mockRequest();
            let dbCallUser = sandbox.stub(User, "findById").returns({select:sandbox.stub().throws()});

            await getUser(req, res)
            expect(dbCallUser.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true
            expect(res.status.calledWith(errorCode)).to.be.true;
            expect(res.send.calledOnce).to.be.true
        })
    })

    describe('login route controller: loginUser', () => {
        const mockRequest = () => {
            const req = {
                body: {
                    email: 'fake@email.com',
                    password: 'wrongpassword'
                }
            }
            return req
        }

        const mockUser = () => {
            return {
                id: '604f7c8d31c4ab00aaca213d',
                name: 'fake name',
                email: 'fake@email.com',
            }
        }

        const mockUserWithPassword = () => {
            return {
                id: '604f7c8d31c4ab00aaca213d',
                name: 'fake name',
                email: 'fake@email.com',
                password: '$2a$10$Fg8eYEHKeQ1R/2mEARwcG.Rc05rcg.LkBAzuoa1Iop4SW1gYqZnPa'
            }
        }

        it('should find one user and compare passwords', async () => {
            let req = mockRequest();
            let fakeUser = mockUser();
            let dbUserCall = sandbox.stub(User, 'findOne').returns(fakeUser);
            let decryptPassword = sandbox.stub(bcrypt, 'compare').callsFake(() => Promise.resolve(true))

            await loginUser(req, res)
            expect(dbUserCall.calledOnce).to.be.true;
            expect(dbUserCall.calledWith({email: req.body.email})).to.be.true;
            expect(decryptPassword.calledOnce).to.be.true;
        });
        it('handles error when no user is found', async () => {
            let req = mockRequest();
            let dbUserCall = sandbox.stub(User, 'findOne').returns(undefined);
            
            await loginUser(req,res);
            expect(dbUserCall.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(badCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })
        it('handles error when password does not match', async () => {
            let req = mockRequest();
            let fakeUser = mockUserWithPassword();

            sandbox.stub(User, 'findOne').returns(fakeUser);
            let bcryptCompare = sandbox.spy(bcrypt, 'compare');
            
            await loginUser(req,res);
            expect(bcryptCompare.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(badCode)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
        })
        it('creates a token and sends it', async () => {
            let req = mockRequest();
            let fakeUser = mockUser();
            fakeToken = 'ajslf08sadfkl'

            sandbox.stub(User, 'findOne').returns(fakeUser);
            sandbox.stub(bcrypt, 'compare').callsFake(() => Promise.resolve(this))
            let createToken = sandbox.stub(jwt, 'sign').returns(fakeToken);
            
            await loginUser(req,res);
            expect(createToken.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({token: fakeToken}))
        });
        it('handles error when token signing throws error', async () => {
            let req = mockRequest();
            let fakeUser = mockUser();

            sandbox.stub(User, 'findOne').returns(fakeUser);
            sandbox.stub(bcrypt, 'compare').callsFake(() => Promise.resolve(this))
            let createToken = sandbox.stub(jwt, 'sign').throws();
            
            await loginUser(req,res);
            expect(createToken.calledOnce).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.status.calledWith(errorCode))
        })
    })
})