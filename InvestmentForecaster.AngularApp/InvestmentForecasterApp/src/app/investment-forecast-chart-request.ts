export interface IForecastChartRequest
{
    XAxisLabels : Array<string>; 
    Data: Array<DataSetObj>;
}

export class DataSetObj {
    lowerBound: Array<number>;
    backgroundColor: string;
    higherBound: Array<number>;
    label: string

    constructor(lowerBound : Array<number> ,backgroundColor: string, higherBound: Array<number>, label:string){
        this.lowerBound =lowerBound;
        this.backgroundColor = backgroundColor;
        this.label = label;
        if (higherBound && higherBound.length > 0)
        {
            this.higherBound = higherBound;
        }
    }

}

export class ForecastChartRequest implements IForecastChartRequest {
    XAxisLabels : Array<string>; 
    Data: Array<DataSetObj>;
    
    constructor(XAxisLabels : Array<string>, Data: Array<DataSetObj>){
        this.XAxisLabels = XAxisLabels;
        this.Data = Data;
    }
}