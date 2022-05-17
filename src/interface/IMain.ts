export enum MainType {
    Chart="chart",
    Grid="grid"
}

export interface IMain {
    type: MainType;
    meta?: any;
}