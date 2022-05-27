export enum MainType {
    Chart="chart",
    Grid="grid",
    Stats="stats",
    Contact="contact"
}

export interface IMain {
    type: MainType;
    meta?: any;
}