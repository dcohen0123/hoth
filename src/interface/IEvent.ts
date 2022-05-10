export enum EventType {
    Drill="drill"
}

export interface IEvent {
    id: string;
    type: EventType;
    meta?: any;
}