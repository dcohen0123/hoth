import { ColDef, ValueFormatterParams } from "ag-grid-community";
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
                    pctWidth: 85,
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
                id: "completeness",
                name: "Completeness",
                fn: "completeness",
                pos: {
                    pctX: 0,
                    pctY: 33,
                    pctWidth: 70,
                    pctHeight: 33
                },
                main: {
                    type: MainType.Grid,
                    meta: {
                        colDefs: [
                            {field: "id", headerName: "Patient ID", width: 100},
                            {field: "first_name", headerName: "First Name", width: 120},
                            {field: "last_name", headerName: "Last Name", width: 120},
                            {colId: "completenessBar", field: "completeness", headerName: "Completeness", width: 400, cellRenderer: "ProgressBar"},
                            {colId: "completeness", field: "completeness", headerName: "Percent", type: "percent", width: 100}
                        ] as ColDef[]
                    }
                },
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
                    pctX: 70,    
                    pctY: 33,
                    pctWidth: 30,
                    pctHeight: 33
                },
                main: {
                    type: MainType.Grid,
                    meta: {
                        colDefs: [
                            {field: "date", headerName: "Date"},
                            {field: "numPatients", headerName: "# Patients"}
                        ]
                    }
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
                    type: MainType.HothContact
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
                    type: MainType.InstitutionContact
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
