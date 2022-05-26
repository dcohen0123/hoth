import { IDataManager } from "../../interface/IDataManager";

const dataManager: IDataManager = {
    dashboards: [{
        id: "d1",
        name: "Dashboard 1",
        inputs: [],
        widgets: [
            {
                id: "1",
                pos: {
                    pctX: 0,
                    pctY: 0,
                    pctWidth: 50,
                    pctHeight: 33
                }
            } as any,
            {
                id: "2",
                pos: {
                    pctX: 50,
                    pctY: 0,
                    pctWidth: 50,
                    pctHeight: 33
                }
            } as any,
            {
                id: "3",
                pos: {
                    pctX: 0,
                    pctY: 33,
                    pctWidth: 50,
                    pctHeight: 33
                }
            } as any,
            {
                id: "4",
                pos: {
                    pctX: 0,
                    pctY: 33,
                    pctWidth: 50,
                    pctHeight: 33
                }
            } as any,
            {
                id: "5",
                pos: {
                    pctX: 0,
                    pctY: 66,
                    pctWidth: 50,
                    pctHeight: 33
                }
            } as any,
            {
                id: "6",
                pos: {
                    pctX: 50,
                    pctY: 66,
                    pctWidth: 50,
                    pctHeight: 33
                }
            } as any,
        ]
    }],
    learn: []
}

export default dataManager;