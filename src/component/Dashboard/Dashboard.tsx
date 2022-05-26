import { useSelector } from "react-redux"
import { IDashboard } from "../../interface/IDashboard"
import { IState } from "../../interface/IState"
import { IWidget } from "../../interface/IWidget"
import Split from "../Split/Split"

const sortWidgets = (a: IWidget, b: IWidget) => {
    if (a?.pos?.pctX < b?.pos?.pctX) {
        return -1;
    } else if (a?.pos?.pctX > b?.pos?.pctX) {
        return 1;
    } else {
        if (a?.pos?.pctY < b?.pos?.pctY) {
            return -1;
        } else if (a?.pos?.pctY > b?.pos?.pctY) {
            return 1;
        } else {
            return 0;
        }
    }
}

export interface IDashboardProps {
    viewId: string;
}

const getGroups = (widgets: IWidget[]) => {
    const groups = [];
    for (let i: number = 0; i < widgets.length; i++) {
        const anchor = widgets[i];
        const node: any = {anchor, group: []}
        for (let j: number = 0; j < widgets.length; j++) {
            if (widgets[j]?.id === anchor?.id) continue;
            if (widgets[j]?.pos?.pctY >= anchor?.pos?.pctY && widgets[j]?.pos?.pctY + widgets[j]?.pos?.pctHeight <= anchor?.pos?.pctY + anchor?.pos?.pctHeight) {
                if (widgets[j]?.pos?.pctX >= anchor?.pos?.pctX) {
                    node.group.push(widgets[j]);
                }
            }
        }
        groups.push(node)
    }
    return groups;
}

const findNode = (tree: any, item: any) => {
    let result = null;
    const nodes = [...tree]
    while (nodes.length > 0) {
        const node = nodes.pop();
        if (node.value.group.some((x: any) => x.id === item.anchor.id) && !node.children.some((x: any) => x.value.group.some((y: any) => y.id === item.anchor.id))) {
            result = node;
            break;
        } else {
            nodes.push(...node.children)
        }
    }
    return result;
}

const getTree = (groups: any[]) => {
    const tree = []
    for (let i: number = 0; i < groups.length; i++) {
        const node = findNode(tree, groups[i]);
        if (node) {
            node.children.push({value: groups[i], children: [], parent: node})
        } else {
            tree.push({value: groups[i], children: [], parent: null});
        }
    }
    return tree;
}

const getResult = (tree: any[]) => {
    if (!tree || tree.length === 0) {
        return null;
    }
    if (tree.length === 1) {
        const items: any[] = [];
        items.push(<div>{tree[0].value.anchor.id}</div>)
        const val = getResult(tree[0].children);
        if (Array.isArray(val)) {
            items.push(...val);
        } else {
            items.push(val);
        }
        return tree[0].parent?.children.length !== 1 ? <Split direction="vertical">{items}</Split> :items

    }
    if (tree.length > 1) {
        const items: any[] = [];
        for (let i: number = 0; i < tree.length; i++) {
            items.push(getResult([tree[i]]));
        }
        return <Split direction="horizontal">{items}</Split>
    }
}

const Dashboard = ({viewId}: IDashboardProps) => {
    const dashboard: IDashboard = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x.id === viewId))?.meta
    const widgets: IWidget[] = [...dashboard?.widgets].sort(sortWidgets)
    const groups: any[] = getGroups(widgets); // TODO: convert widgets into groups.
    const tree: any[] = getTree(groups) // TODO: convert groups into tree
    const result: any = getResult(tree)
    return result;
}

export default Dashboard;