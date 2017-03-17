import Sensor from '../sensor';
import * as mocha from 'mocha';
import { expect } from 'chai';

class ZeroSensor extends Sensor<number> {
    readDataFromSensor(): number { 
        return 0;
    }

    getReadInternalInMilliseconds(): number {
        return 10;
    }
}

describe('a sensor that always returns zero', () => {
    let sensor: ZeroSensor;

    beforeEach(() => {
        sensor = new ZeroSensor();
    });

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
        this.slow(110);
        
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