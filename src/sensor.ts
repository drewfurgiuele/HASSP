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
            try {
                this.readAndReportDataFromSensor();
            } catch (error) {
                this.handleAndReportError(error);
            }
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

    public onSensorError(callback: (error: Error) => void) {
        this.eventEmiiter.on('error', callback);
    };

    protected abstract getReadInternalInMilliseconds(): number;
    protected abstract readDataFromSensor(): TDataType;
    protected abstract initializeSensor(): void;
    protected abstract cleanUpSensor(): void;

    private readAndReportDataFromSensor(): void {
        let data = this.readDataFromSensor();
        this.eventEmiiter.emit('sensor-read', data);
    }

    private handleAndReportError(error: any) {
        if (error instanceof Error) {
            this.eventEmiiter.emit('error', error);
        } else {
            this.eventEmiiter.emit('error', new Error(error));
        }
    }
}

export default Sensor;
