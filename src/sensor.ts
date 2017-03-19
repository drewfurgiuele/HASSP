import * as EventEmmiter from 'events';

abstract class Sensor<TDataType> {
    private isRunning: boolean;
    private eventEmiiter: EventEmmiter;
    private intervalHandle: NodeJS.Timer;

    constructor() {
        this.isRunning = false;
        this.eventEmiiter = new EventEmmiter();
    }

    public start() {
        if (this.isRunning) { return; }

        this.isRunning = true;

        this.initializeSensor();

        this.intervalHandle = setInterval(() => {
            let data = this.readDataFromSensor();

            this.eventEmiiter.emit('sensor-read', data);

        }, this.getReadInternalInMilliseconds());
    }

    public stop() {
        if (!this.isRunning) { return; }

        clearInterval(this.intervalHandle);
        this.cleanUpSensor();

        this.isRunning = false;
    }

    public onSensorDataRead(callback: (data: TDataType) => void) {
        this.eventEmiiter.on('sensor-read', callback);
    }

    protected abstract getReadInternalInMilliseconds(): number;
    protected abstract readDataFromSensor(): TDataType;
    protected abstract initializeSensor(): void;
    protected abstract cleanUpSensor(): void;
}

export default Sensor;
