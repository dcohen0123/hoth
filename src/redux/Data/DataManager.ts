import { IDataManager } from "../../interface/IDataManager";
import { InputType } from "../../interface/IInput";
import { MainType } from "../../interface/IMain";

const dataManager: IDataManager = {
    dashboards: [{
        id: "d1",
        name: "Dashboard 1",
        inputs: [],
        widgets: [
            {
                id: "numSubjectsCumulativeInstitution",
                name: "# Subjects Cumulative in Institution",
                main: {
                    type: MainType.Chart,
                    meta: {
                        series: [{
                            name: "# Subjects Cumulative",
                            type: 'column',
                            data: [10, 20, 30, 50, 80, 100, 120, 140, 160, 200, 210, 220, 230, 240, 250, 260, 280, 310, 350, 400]
                        }]
                    }
                },
                pos: {
                    pctX: 0,
                    pctY: 0,
                    pctWidth: 85,
                    pctHeight: 33
                },
                inputs: [{
                    id: "interval",
                    type: InputType.Select,
                    meta: {
                        default: "week",
                        data: [{
                            key: "By Day",
                            value: "day"
                        }, {
                            key: "By Week",
                            value: "week"
                        }, {
                            key: "By Month",
                            value: "month"
                        }, {
                            key: "By Year",
                            value: "year"
                        }]
                    }
                },
                {
                    id: "legend",
                    type: InputType.Legend
                }, {
                    id: "maximize",
                    type: InputType.Maximize
                }, {
                    id: "popout",
                    type: InputType.Popout
                }]
            } as any,
            {
                id: "stats",
                name: "Stats",
                pos: {
                    pctX: 85,
                    pctY: 0,
                    pctWidth: 15,
                    pctHeight: 33
                },
                inputs: [{
                    id: "maximize",
                    type: InputType.Maximize
                }, {
                    id: "popout",
                    type: InputType.Popout
                }]
            } as any,
            {   
                id: "completenessIndicator",
                name: "Completeness Indicator",
                pos: {
                    pctX: 0,
                    pctY: 33,
                    pctWidth: 50,
                    pctHeight: 33
                }, 
                inputs: [
                {
                    id: "filterSubject",
                    type: InputType.Search,
                    meta: {
                        placeholder: "Subject",
                    }
                }, {
                    id: "maximize",
                    type: InputType.Maximize
                }, {
                    id: "popout",
                    type: InputType.Popout
                }]
            } as any,
            {
                id: "numSubjects",
                name: "# Subjects",
                pos: {
                    pctX: 50,    
                    pctY: 33,
                    pctWidth: 50,
                    pctHeight: 33
                },
                inputs: [{
                    id: "interval",
                    type: InputType.Select,
                    meta: {
                        default: "week",
                        data: [{
                            key: "By Day",
                            value: "day"
                        }, {
                            key: "By Week",
                            value: "week"
                        }, {
                            key: "By Month",
                            value: "month"
                        }, {
                            key: "By Year",
                            value: "year"
                        }]
                    }
                }, {
                    id: "maximize",
                    type: InputType.Maximize
                }, {
                    id: "popout",
                    type: InputType.Popout
                }]
            } as any,
            {
                id: "hothContact",
                name: "Your Hoth Contact",
                pos: {
                    pctX: 0,
                    pctY: 66,
                    pctWidth: 50,
                    pctHeight: 33
                },      
                inputs: [{
                    id: "maximize",
                    type: InputType.Maximize
                }, {
                    id: "popout",
                    type: InputType.Popout
                }]
            } as any,
            {
                id: "institutionContact",
                name: "Your Institution Contact",
                pos: {
                    pctX: 50,
                    pctY: 66,
                    pctWidth: 50,
                    pctHeight: 33
                }, 
                inputs: [{
                    id: "maximize",
                    type: InputType.Maximize
                }, {
                    id: "popout",
                    type: InputType.Popout
                }]
            } as any,
        ]
    }],
    learn: []
}

export default dataManager;
