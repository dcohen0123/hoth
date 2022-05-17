export enum EventType {
    WidgetDrill="WIDGET_DRILL",
    WidgetResize="WIDGET_RESIZE"
}

export interface IEvent {
    type: EventType;
    meta?: any;
}