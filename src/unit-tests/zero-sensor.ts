import Sensor from '../sensor';
import * as mocha from 'mocha';
import { expect } from 'chai';

class ZeroSensor extends Sensor<number> {
    initializedCount = 0;
    cleanUpCount = 0;

    readDataFromSensor(): number { 
        return 0;
    }

    getReadInternalInMilliseconds(): number {
        return 10;
    }

    initializeSensor(): void {
        this.initializedCount++;
    }

    cleanUpSensor(): void {
        this.cleanUpCount++;
    }
}

describe('a sensor that always returns zero', () => {
    let sensor: ZeroSensor;

    beforeEach(() => {
        sensor = new ZeroSensor();
    });

    afterEach(() => {
        sensor.stop();
    });

    describe('reading data', () => {
        it('pulls a single zero off of the sensor', (done) => {
            sensor.onSensorDataRead((data) => {
                expect(data).to.equal(0);
                sensor.stop();
                done();
            });

            sensor.start();
        });

        it('reads multiple zeros off the sensor', function(done) {
            this.timeout(200);
            this.slow(120);
            
            let counter = 0;

            sensor.onSensorDataRead((data) => {
                expect(data).to.equal(0);
                
                counter++;
                if (counter == 10) {
                    sensor.stop();
                    done();
                }
            });

            sensor.start()
        });
    });

    describe('sensor setup and cleanup', () => {
        it('does not initialize at creation', () => {
            expect(sensor.initializedCount).to.equal(0);
        });

        it('does not cleanup at creation', () => {
            expect(sensor.cleanUpCount).to.equal(0);
        });

        it('calls initialize when sensor is started', () => {
            sensor.start();
            expect(sensor.initializedCount).to.equal(1);
        });

        it('calls cleanup when a sensor is stopped', () => {
            sensor.start();
            sensor.stop();

            expect(sensor.cleanUpCount).to.equal(1);
        })
    });
});