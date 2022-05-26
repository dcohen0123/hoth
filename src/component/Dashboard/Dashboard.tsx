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
            if (widgets[j]?.id !== anchor?.id) {
                if (widgets[j]?.pos?.pctY >= anchor?.pos?.pctY && widgets[j]?.pos?.pctY + widgets[j]?.pos?.pctHeight <= anchor?.pos?.pctY + anchor?.pos?.pctHeight) {
                    node.group.push(widgets[j]);
                }
            }
        }
        groups.push(node)
    }
    groups.sort((a, b) => {
        if (a.anchor.pos.pctY < b.anchor.pos.pctY) {
            return -1;
        } else if (a.anchor.pos.pctY < b.anchor.pos.pctY) {
            return 1;
        } else {
            return b.group.length - a.group.length;
        }
    })
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
        const val = getResult(tree[0].children);
        if (val) {
            if (Array.isArray(val)) {
                items.push(...val);
            } else {
                items.push(val);
            }
        }
        if (tree[0].value.anchor.pos.pctX > tree[0].children?.[0]?.value?.anchor?.pos?.pctX) {
            items.push(<div data-pos={tree[0].value.anchor.pos}>{tree[0].value.anchor.id}</div>)
        } else {
            items.unshift(<div data-pos={tree[0].value.anchor.pos}>{tree[0].value.anchor.id}</div>)
        }
        items.sort((a, b) => a.props["data-pos"].pctX - b.props["data-pos"].pctX)
        const pctHeight: any = items.map(x => x.props["data-pos"].pctHeight)
        const pctY: any = items.map(x => x.props["data-pos"].pctY)
        const pctX: any = items.map(x => x.props["data-pos"].pctX)
        const totalWidth: any = items.map(x => x.props["data-pos"].pctWidth).reduce((acc, curr) => acc + curr)
        const initSplit=items.map(x => (x.props["data-pos"].pctX - pctX[0]) / totalWidth).slice(1)
        return tree[0].parent?.children.length !== 1 ? <Split data-pos={{pctX: pctX[0], pctWidth: totalWidth, pctY: pctY[0], pctHeight: pctHeight[0]}} direction="vertical" initSplit={initSplit}>{items}</Split> :items

    }
    if (tree.length > 1) {
        const items: any[] = [];
        for (let i: number = 0; i < tree.length; i++) {
            items.push(getResult([tree[i]]));
        }
        items.sort((a, b) => a.props["data-pos"].pctY - b.props["data-pos"].pctY)
        const pctX: any = items.map(x => x.props["data-pos"].pctX)
        const pctY: any = items.map(x => x.props["data-pos"].pctY)
        const pctWidth: any = items.map(x => x.props["data-pos"].pctWidth)
        const totalHeight: any = items.map(x => x.props["data-pos"].pctHeight).reduce((acc, curr) => acc + curr)
        const initSplit=items.map(x => (x.props["data-pos"].pctY - pctY[0]) / totalHeight).slice(1)
        return <Split data-pos={{pctX: pctX[0], pctY: pctY[0], pctWidth: pctWidth[0], pctHeight: totalHeight}} direction="horizontal" initSplit={initSplit}>{items}</Split>
    }
}

const Dashboard = ({viewId}: IDashboardProps) => {
    const dashboard: IDashboard = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x.id === viewId))?.meta
    const widgets: IWidget[] = [...dashboard?.widgets].sort(sortWidgets)
    const groups: any[] = getGroups(widgets);
    const tree: any[] = getTree(groups)
    const result: any = getResult(tree)
    return result;
}

export default Dashboard;