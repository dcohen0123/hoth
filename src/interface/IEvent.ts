export enum EventType {
    WidgetDrill="WIDGET_DRILL",
}

export interface IEvent {
    type: EventType;
    meta?: any;
}