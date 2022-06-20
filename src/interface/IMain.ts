export enum MainType {
    Chart="chart",
    Grid="grid",
    Stats="stats",
    HothContact="hothContact",
    InstitutionContact="institutionContact"
}

export interface IMain {
    type: MainType;
    meta?: any;
}