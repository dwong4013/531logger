const sanitizeBody = require('../../middleware/sanitizeBody');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Middleware: sanitizeBody', () => {
  const mockResponse = () => {
    const res = {};
    res.statusCode = '';
    res.data = {}
    res.status = ()=> {
      return res
    };
    res.send = () => {
      return res
    };
    res.json = () => {
      return res
    };
    return res
  }

  const mockRequest = () => {
    const req = {};
    req.body = {
        $comment: 'test',
        okay: 'good'
      }
    return req;
  }

  const mockRequestNested = () => {
    const req = {};
    req.body = {
        comment: {$hello: 'test'},
        okay: 'good'
      }
    return req;
  }

  let expectedObjects = {
    object: {
        okay: 'good'
    },
    nestedObject: {
        comment: {},
        okay: 'good'
    }
}

  const sandbox = sinon.createSandbox();
  let res = mockResponse();
  let next = sandbox.stub()
  
  beforeEach(function() {
    sandbox.spy(next)
  })

  afterEach(function() {
    sandbox.reset();
  })

  it('should sanitizeBody req.body and call next', async () => {
    let req = mockRequest();
    await sanitizeBody(req, res, next);
    expect(req.body).to.eql(expectedObjects.object)
    expect(next.calledOnce).to.be.true;
  });

  it('should sanitizeBody req.body of nested keys and call next', async () => {
    let req = mockRequestNested()
    await sanitizeBody(req, res, next);
    expect(req.body).to.eql(expectedObjects.nestedObject)
    expect(next.calledOnce).to.be.true;
  });
})
