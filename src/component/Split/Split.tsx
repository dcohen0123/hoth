import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { EventType } from "../../interface/IEvent";
import { AddEvent } from "../../redux/Event/EventAction";

export interface ISplitProps {
    viewId: string;
    initSplit?: number[];
    direction: "horizontal" | "vertical";
    children: JSX.Element[];
}

const StyledSplit = styled.div`
    width: 100%;
    height: 100%;
    user-select: none;
    overflow: hidden;
`;

const StyledSplitter = styled.div<{direction: "vertical" | "horizontal"}>`
    width: ${props => props.direction === "vertical" ? "2px" : "100%"};
    height: ${props => props.direction === "horizontal" ? "2px" : "100%"};
    cursor: ${props => props.direction === "vertical" ? "col-resize" : "row-resize"};
    display: ${props => props.direction === "vertical" ? "inline-block" : "block"};
    background: #ccc;
    vertical-align: top;
`;

const StyledDiv = styled.div<{direction: "vertical" | "horizontal", size: number, split: number[]}>`
    display: ${props => props.direction === "vertical" ? "inline-block" : "block"};
    width: ${props => props.direction === "vertical"  ? "calc(" + (props.size * 100) + "% - " + props.split.length + "px)" : "100%"};
    height: ${props => props.direction === "horizontal" ? "calc(" + (props.size * 100) + "% - " + props.split.length + "px)" : "100%"};
    overflow: hidden;
    vertical-align: top;
`

const Split = ({viewId, direction="horizontal", children, initSplit}: ISplitProps) => {
    const dispatch = useDispatch()
    const filteredChildren = children.filter(x => x)
    const [split, setSplit] = useState<any>(initSplit ?? Array(filteredChildren.length - 1).fill(null).map((x, i) => (i + 1) / filteredChildren.length));
    const isMouseDown = useRef<boolean>(false);
    const splitIndex = useRef<number>(0);
    const box = useRef<any>();
    const childrenRef = useRef(children)
    useEffect(() => {
        if (children?.length !== childrenRef?.current?.length) {
            setSplit(initSplit)
            childrenRef.current = children;
        }
    }, [initSplit])
    const handleMouseDown = (i: number) => {
        return () => {
            isMouseDown.current = true;
            splitIndex.current = i;
        }
    }
    const handleMouseUp = () => {
        if (isMouseDown.current) {
            dispatch({type: AddEvent, payload: {type: EventType.Resize, meta: {viewId}}});
        }
        isMouseDown.current = false;
    }
    const handleMouseMove = (e: any) => {
        if (isMouseDown.current) {
            const newSplit = [...split]
            let value: number = 1;
            const rect = box.current.getBoundingClientRect();
            if (direction === "vertical") {
                value = (e.clientX - rect.left) / rect.width;
            } else if (direction === "horizontal") {
                value = (e.clientY - rect.top) / rect.height;
            }
            newSplit[splitIndex.current] = Math.max(Math.min(value, newSplit[splitIndex.current + 1] ?? 1), newSplit[splitIndex.current - 1] ?? 0)
            setSplit(newSplit)
        }
    }
    return <StyledSplit ref={box} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>{filteredChildren.map((x, i) => <>
        <StyledDiv split={split} direction={direction} size={(split[i] ?? 1) - (split[i - 1] ?? 0)}>{filteredChildren[i]}</StyledDiv>
        {filteredChildren[i + 1] && <StyledSplitter direction={direction} onMouseDown={handleMouseDown(i)} />}
    </>)}</StyledSplit>
}

export default Split;