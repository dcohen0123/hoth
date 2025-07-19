export enum EventType {
    WidgetDrill="WIDGET_DRILL",
    Resize="RESIZE"
}

export interface IEvent {
    type: EventType;
    meta?: any;
}