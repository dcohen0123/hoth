import styled from "styled-components";
import DashboardInputs from "../DashboardInputs/DashboardInputs";
import DashboardWidgets from "../DashboardWidgets/DashboardWidgets";

const StyledDashboard = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    flex-direction: column;
`

export interface IDashboardProps {
    viewId: string;
}

const Dashboard = ({viewId}: IDashboardProps) => {
    return <StyledDashboard>
        <DashboardInputs viewId={viewId} />
        <DashboardWidgets viewId={viewId}/>
    </StyledDashboard>
}

export default Dashboard;