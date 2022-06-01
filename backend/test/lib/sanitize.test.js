const sanitize = require('../../lib/sanitize');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Lib: sanitize', () => {
    let object = {
        $comment: 'test',
        okay: 'good'
    }

    
    let nestedObject = {
        comment: {$hello: 'test'},
        okay: 'good'
    }
    
    let expectedObjects = {
        object: {
            okay: 'good'
        },
        nestedObject: {
            okay: 'good'
        }
    }

  it('should remove keys that start with $', async () => {
    await sanitize(object);
    expect(object).to.eql(expectedObjects.object)
  });

  it('should remove nested keys that start with $', async () => {
    await sanitize(nestedObject);
    expect(object).to.eql(expectedObjects.nestedObject)
  });
})
