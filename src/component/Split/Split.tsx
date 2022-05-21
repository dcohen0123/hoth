import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { EventType } from "../../interface/IEvent";
import { AddEvent } from "../../redux/Event/EventAction";

export interface ISplitProps {
    initSplit?: number;
    direction: "horizontal" | "vertical";
    children: JSX.Element[];
    onResize?: (split: number) => void;
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

const StyledDiv = styled.div<{direction: "vertical" | "horizontal", fullSize?: boolean, split: number}>`
    display: ${props => props.direction === "vertical" ? "inline-block" : "block"};
    width: ${props => props.direction === "vertical" &&  !props.fullSize ? "min(calc(" + (props.split * 100) + "% - 1px), calc(100% - 2px))" : "100%"};
    height: ${props => props.direction === "horizontal" && !props.fullSize ? "min(calc(" + (props.split * 100) + "% - 1px), calc(100% - 2px))" : "100%"};
    overflow: hidden;
    vertical-align: top;
`

const Split = ({direction="horizontal", children, initSplit, onResize}: ISplitProps) => {
    const [split, setSplit] = useState(initSplit ?? .5);
    const isMouseDown = useRef<boolean>(false);
    const box = useRef<any>();
    const handleMouseDown = () => {
        isMouseDown.current = true;
    }
    const handleMouseUp = () => {
        onResize && onResize(split);
        isMouseDown.current = false;
    }
    const handleMouseMove = (e: any) => {
        if (isMouseDown.current) {
            let value: number = 1;
            const rect = box.current.getBoundingClientRect();
            if (direction === "vertical") {
                value = (e.clientX - rect.left) / rect.width;
            } else if (direction === "horizontal") {
                value = (e.clientY - rect.top) / rect.height;
            }
            setSplit(value)
        }
    }
    return <StyledSplit ref={box} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
        {children[0] && <StyledDiv direction={direction} fullSize={!children[1]} split={split}>{children[0]}</StyledDiv>}
        {children[0] && children[1] && <StyledSplitter direction={direction} onMouseDown={handleMouseDown} />}
        {children[0] && children[1] && <StyledDiv direction={direction} split={1 - split}>{children[1]}</StyledDiv>}
    </StyledSplit>
}

export default Split;