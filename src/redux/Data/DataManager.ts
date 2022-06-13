import { IDataManager } from "../../interface/IDataManager";
import { InputType } from "../../interface/IInput";
import { MainType } from "../../interface/IMain";

const dataManager: IDataManager = {
    institutions: [],
    dashboards: [{
        id: "d1",
        name: "Dashboard 1",
        inputs: [{
            id: "institution",
            name: "Insitution",
            type: InputType.Institution,
            align: "left",
        }, {
            id: "date",
            name: "Date",
            type: InputType.DateRange,
            align: "right"
        }],
        widgets: [
            {
                id: "numSubjectsCumulativeInstitution",
                name: "# Subjects Cumulative in Institution",
                main: {
                    type: MainType.Chart,
                    meta: {
                        series: [{
                            name: "# Subjects Cumulative",
                            type: 'line',
                            data: [10, 20, 30, 50, 80, 100, 120, 140, 160, 200, 210, 220, 230, 240, 250, 260, 280, 310, 350, 400]
                        }]
                    }
                },
                pos: {
                    pctX: 0,
                    pctY: 0,
                    pctWidth: 90,
                    pctHeight: 33
                },
                inputs: [{
                    id: "interval",
                    type: InputType.Select,
                    value: "week",
                    meta: {
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
                main: {
                    type: MainType.Stats
                },
                pos: {
                    pctX: 90,
                    pctY: 0,
                    pctWidth: 10,
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
                main: {
                    type: MainType.Grid,
                    meta: {
                        colDefs: [{field: "Subject"}, {field: "Completeness", width: 400, cellRenderer: "ProgressBar"}, {field: "Percent"}, {field: "Go To Subject"}]
                    }
                },
                data: [{"Subject": "Total", "Percent": "84%", "Go To Subject": "<Link To Subject>"},
                    {"Subject": 88, "Percent": "84%", "Go To Subject": "<Link To Subject>"},
                    {"Subject": 87, "Percent": "84%", "Go To Subject": "<Link To Subject>"},
                    {"Subject": 86, "Percent": "30%", "Go To Subject": "<Link To Subject>"},
                    {"Subject": 85, "Percent": "81%", "Go To Subject": "<Link To Subject>"}
                ],
                inputs: [{
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
                main: {
                    type: MainType.Grid,
                    meta: {
                        colDefs: [{field: "Date"}, {field: "# Subjects"}]
                    }
                },
                data: [
                    {"Date": "Total", "# Subjects": "210"},
                    {"Date": "1/8/2022", "# Subjects": 14},
                    {"Date": "1/15/2022", "# Subjects": 15},
                    {"Date": "1/23/2022", "# Subjects": 12},
                    {"Date": "1/31/2022", "# Subjects": 16}
                ],
                inputs: [{
                    id: "interval",
                    type: InputType.Select,
                    value: "week",
                    meta: {
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
                main: {
                    type: MainType.Contact
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
                main: {
                    type: MainType.Contact
                },
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
