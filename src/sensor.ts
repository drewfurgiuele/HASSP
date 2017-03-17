import * as EventEmmiter from 'events';

abstract class Sensor<TDataType> {

    abstract getReadInternalInMilliseconds(): number;
    abstract readDataFromSensor(): TDataType;

    private _isRunning: boolean;
    private _eventEmiiter: EventEmmiter;
    private _intervalHandle: NodeJS.Timer;

    constructor() {
        this._isRunning = false;
        this._eventEmiiter = new EventEmmiter();
    }

    start() {
        if (this._isRunning) { return; }

        this._isRunning = true;

        this._intervalHandle = setInterval(() => {
            let data = this.readDataFromSensor();

            this._eventEmiiter.emit('sensor-read', data);

        }, this.getReadInternalInMilliseconds());
    }

    stop() {
        if (!this._isRunning) { return; }

        clearInterval(this._intervalHandle);
        this._isRunning = false;
    }

    onSensorDataRead(callback: (data: TDataType) => void){
        this._eventEmiiter.on('sensor-read', callback);
    }
}

export default Sensor;