import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IState } from "../../interface/IState";
import { ViewType } from "../../interface/IView";
import { AddView } from "../../redux/Workspace/WorkspaceActions";
import Nav from "../Nav/Nav";
import WorkspaceContainer from "../Workspace/WorkspaceContainer";
import { v4 as uuidv4 } from 'uuid';

const StyledDiv = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const Hoth = () => {
    const dashboards = useSelector((state: IState) => state.dataManager?.dashboards);
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch({type: AddView, payload: {id: uuidv4(), name: dashboards?.[0]?.name, type: ViewType.Dashboard, meta: JSON.parse(JSON.stringify(dashboards?.[0]))}});
    }, [])
    return <StyledDiv>
        <Nav />
        <WorkspaceContainer />
    </StyledDiv>
}

export default Hoth;