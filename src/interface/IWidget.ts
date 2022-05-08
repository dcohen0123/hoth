import { IInput } from "./IInput";

export enum WidgetType {
    CumulativeSubjects="cumulativeSubjects",
    Stats="stats",
    Completeness="completeness",
    NumberSubjects="numberSubjects",
    Contact="contact"
}

export type WidgetContent = /* ICumulativeSubject | IStats | ICompleteness | INumberSubjects | IContact */ "";

export interface IWidget {
    id: string;
    title: string;
    type: WidgetType;
    header: string;
    inputs: IInput[];
    content: WidgetContent;
}