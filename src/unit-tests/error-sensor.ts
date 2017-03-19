import Sensor from '../sensor';
import * as mocha from 'mocha';
import { expect } from 'chai';

class ErrorSensor extends Sensor<number> {
    protected readDataFromSensor(): number {
        throw new Error('BOOM');
    }

    protected getReadInternalInMilliseconds(): number {
        return 10;
    }

    protected initializeSensor(): void {
    }

    protected cleanUpSensor(): void {
    }
}

class ThrowStringSensor extends Sensor<number> {
    protected readDataFromSensor(): number {
        throw 'BOOM';
    }

    protected getReadInternalInMilliseconds(): number {
        return 10;
    }

    protected initializeSensor(): void {
    }

    protected cleanUpSensor(): void {
    }
}

describe('sensor errors', () => {
    describe('when a sensor throws an error', () => {
        let sensor: ErrorSensor;

        beforeEach(() => {
            sensor = new ErrorSensor();
        });

        afterEach(() => {
            sensor.stop();
        });

        it('passes the error to the handler', (done) => {
            sensor.onSensorError((error) => {
                expect(error.message).to.equal('BOOM');
                sensor.stop();
                done();
            });

            sensor.start();
        });
    });

    describe('when a sensor throws a string', () => {
        let sensor: ThrowStringSensor;

        beforeEach(() => {
            sensor = new ThrowStringSensor();
        });

        afterEach(() => {
            sensor.stop();
        });

        it('wraps the string in an error and passes it to the handler', (done) => {
            sensor.onSensorError((error) => {
                expect(error.message).to.equal('BOOM');
                sensor.stop();
                done();
            });

            sensor.start();
        });
    });
});
