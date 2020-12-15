import {TellorDataPoint} from "@/services/TellorDataPoint";

export class TellorTracker {
    constructor(storage, playground) {
        this.storage = storage;
        this.playground = playground;

    }

    trackNew(id, name){
        let trackedData = JSON.parse(this.storage.getItem('tracked'));
        trackedData.push(
            new TellorDataPoint(name, id)
        );
        this.storage.setItem('tracked', JSON.stringify(trackedData));
    }

    load() {
        console.log('loading tellor data');
        this.dataPoints = [];
        if (!this.storage.getItem('tracked')) {
            this.storage.setItem('tracked', JSON.stringify(this.defaultTrackedData()));
        }
        let trackedData = JSON.parse(this.storage.getItem('tracked'));
        if(!Array.isArray(trackedData) || trackedData.length === 0){
            trackedData = this.defaultTrackedData();
            this.storage.setItem('tracked', JSON.stringify(trackedData));
        }
        trackedData.forEach(tellorDataPoint => this.loadDataPoint(tellorDataPoint));
        return this.dataPoints;
    }

    async loadDataPoint(tellorDataPoint) {
        console.log(tellorDataPoint);
        const tellorId = tellorDataPoint["tellorId"];
        const valueCount = await this.playground.getNewValueCountbyRequestId(tellorId);
        const index = valueCount > 0 ? valueCount - 1 : 0;
        const timestamp = await this.playground.getTimestampbyRequestIDandIndex(tellorId, index);
        const value = await this.playground.retrieveData(tellorId, timestamp);
        this.dataPoints.push({
            id: tellorId,
            name: tellorDataPoint["dataPointName"],
            index: index,
            timestamp: timestamp,
            value: value,
        });
    }

    defaultTrackedData() {
        return [
            new TellorDataPoint('ETH/USD', 1),
            new TellorDataPoint('BTC/USD', 2),
            new TellorDataPoint('BNB/USD', 3),
        ];
    }
}