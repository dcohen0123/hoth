import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { IEvent, EventType } from "../../interface/IEvent"
import { IState } from "../../interface/IState"
import { IView } from "../../interface/IView"
import { IWidget } from "../../interface/IWidget"
import { UpdateDrill, RunWidget } from "../../redux/Dashboard/DashboardActions"
import { AddEvent } from "../../redux/Event/EventAction"
import Split from "../Split/Split"
import Widget from "../Widget/Widget"

const StyledDashboardWidgets = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1;
`

export interface IDashboardWidgetsProps {
    viewId: string;
}

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

const getResult = (tree: any[], viewId: string) => {
    if (!tree || tree.length === 0) {
        return null;
    }
    if (tree.length === 1) {
        const items: any[] = [];
        const val = getResult(tree[0].children, viewId);
        if (val) {
            if (Array.isArray(val)) {
                items.push(...val);
            } else {
                items.push(val);
            }
        }
        items.push(<Widget key={tree[0].value.anchor.id} data-pos={tree[0].value.anchor.pos} viewId={viewId} widgetId={tree[0].value.anchor.id} />)
        items.sort((a, b) => a.props["data-pos"].pctX - b.props["data-pos"].pctX)
        const pctHeight: any = items.map(x => x.props["data-pos"].pctHeight)
        const pctY: any = items.map(x => x.props["data-pos"].pctY)
        const pctX: any = items.map(x => x.props["data-pos"].pctX)
        const totalWidth: any = Math.min(items.map(x => x.props["data-pos"].pctWidth).reduce((acc, curr) => acc + curr), 100)
        const initSplit=items.map(x => (x.props["data-pos"].pctX - pctX[0]) / totalWidth).slice(1)
        return tree[0].parent?.children.length !== 1 ? <Split key={tree[0].value.anchor.id} viewId={viewId} data-pos={{pctX: pctX[0], pctWidth: totalWidth, pctY: pctY[0], pctHeight: pctHeight[0]}} direction="vertical" initSplit={initSplit}>{items}</Split> :items

    }
    if (tree.length > 1) {
        const items: any[] = [];
        for (let i: number = 0; i < tree.length; i++) {
            items.push(getResult([tree[i]], viewId));
        }
        items.sort((a, b) => a.props["data-pos"].pctY - b.props["data-pos"].pctY)
        const pctX: any = items.map(x => x.props["data-pos"].pctX)
        const pctY: any = items.map(x => x.props["data-pos"].pctY)
        const pctWidth: any = items.map(x => x.props["data-pos"].pctWidth)
        const totalHeight: any = Math.min(items.map(x => x.props["data-pos"].pctHeight).reduce((acc, curr) => acc + curr), 100)
        const initSplit=items.map(x => (x.props["data-pos"].pctY - pctY[0]) / totalHeight).slice(1)
        return <Split viewId={viewId} data-pos={{pctX: pctX[0], pctY: pctY[0], pctWidth: pctWidth[0], pctHeight: totalHeight}} direction="horizontal" initSplit={initSplit}>{items}</Split>
    }
}

const DashboardWidgets = ({viewId}: IDashboardWidgetsProps) => {
    const view: IView | undefined = useSelector((state: IState) => state?.workspaceManager?.selected?.views?.find(x => x.id === viewId))
    const event: IEvent | null = useSelector((state: IState) => state?.eventManager?.event)
    const dispatch = useDispatch()
    useEffect(() => {
        if (event?.type === EventType.WidgetDrill) {
            if (event?.meta?.viewId !== viewId) return;
            for (let i: number = 0; i < view?.meta?.widgets?.length; i++) {
                if (view?.meta?.widgets[i]?.events?.some((x: IEvent) => x.type === EventType.WidgetDrill && x?.meta?.widgetId === event?.meta?.widgetId)) {
                    dispatch({type: UpdateDrill, payload: {viewId, widgetId: view?.meta?.widgets?.[i]?.id, drill: event?.meta?.drill}});
                    dispatch({type: RunWidget, payload: {viewId, widgetId: view?.meta?.widgets?.[i]?.id}});
                    dispatch({type: AddEvent, payload: {type: EventType.Resize, meta: {viewId}}})
                }
            }
        }
    }, [event]);
    const result = useMemo(() => {
        const widgets = JSON.parse(JSON.stringify(view?.meta?.widgets?.filter((x: any) => !x?.hide))).sort(sortWidgets);
        const groups: any[] = getGroups(widgets);
        const tree: any[] = getTree(groups);
        const result: any = getResult(tree, viewId)
        return result;
  }, [view?.meta?.widgets])
   return <StyledDashboardWidgets>{result}</StyledDashboardWidgets>
}

export default DashboardWidgets;