const expect = require('chai').expect;
const sinon = require('sinon');
const { generateWorkout, createSet, calculateWeight } = require('../../lib/generateWorkout');

describe('generateWorkout module', () => {
    describe('calculateWeight', () => {
        const max = 200
        const setPercent1 = 0.65
        const setPercent2 = 0.86

        it('should round 117 down to 115', () => {
            let weight = calculateWeight(setPercent1, max)
            expect(weight).to.be.equal(115);
        })
        it('should round 153 up to 155', () => {
            let weight = calculateWeight(setPercent2, max)
            expect(weight).to.be.equal(155);
        })
    })
    describe('createSet', () => {
        const setData = {
            setPercent: 0.65,
            reps: 5
        }
        const max = 200

        it('should create one set object with weight and reps', () => {
            let set = createSet(setData, max)
            expect(set).to.have.all.keys('weight', 'reps')
        })
    })
    describe('generateWorkout', () => {
        const user = '604f7c8d31c4ab00aaca213d';
        const cycle = '604f7c8d31c4ab00aaca222d';
        const exercise = 'squat';
        const week = 1;
        const max = 200;

        it('should create a workout document', () => {
            let workout = generateWorkout(user, cycle, exercise, week, max)
            console.log(workout);
        })
    })
})