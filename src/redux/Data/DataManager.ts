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
                id: "numPatientsCumulativeInstitution",
                fn: "numPatientsCumulative",
                name: "# Patients Cumulative",
                main: {
                    type: MainType.Chart,
                    meta: {}
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
                id: "numPatients",
                name: "# Patients",
                fn: "numPatients",
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
                id: "completeness",
                name: "Completeness",
                fn: "completeness",
                pos: {
                    pctX: 0,
                    pctY: 33,
                    pctWidth: 50,
                    pctHeight: 33
                },
                main: {
                    type: MainType.Grid,
                    meta: {
                        colDefs: [{field: "Patient", width: 100}, {field: "Completeness", width: 400, cellRenderer: "ProgressBar"}, {field: "Percent", width: 100}, {field: "Go To Patient", width: 120}]
                    }
                },
                data: [{"Patient": "Total", "Percent": "84%", "Go To Patient": "<Link To Patient>"},
                    {"Patient": 88, "Percent": "84%", "Go To Patient": "<Link To Patient>"},
                    {"Patient": 87, "Percent": "84%", "Go To Patient": "<Link To Patient>"},
                    {"Patient": 86, "Percent": "30%", "Go To Patient": "<Link To Patient>"},
                    {"Patient": 85, "Percent": "81%", "Go To Patient": "<Link To Patient>"}
                ],
                inputs: [{
                    id: "filterPatient",
                    type: InputType.Search,
                    meta: {
                        placeholder: "Patient",
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
                id: "numPatientsGrid",
                name: "# Patients",
                fn: "numPatientsGrid",
                pos: {
                    pctX: 50,    
                    pctY: 33,
                    pctWidth: 50,
                    pctHeight: 33
                },
                main: {
                    type: MainType.Grid,
                    meta: {
                        colDefs: [{field: "Date"}, {field: "# Patients"}]
                    }
                },
                data: [
                    {"Date": "Total", "# Patients": "210"},
                    {"Date": "1/8/2022", "# Patients": 14},
                    {"Date": "1/15/2022", "# Patients": 15},
                    {"Date": "1/23/2022", "# Patients": 12},
                    {"Date": "1/31/2022", "# Patients": 16}
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
                name: "Hoth Contact",
                fn: "hothContact",
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
                name: "Institution Contact",
                fn: "institutionContact",
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
