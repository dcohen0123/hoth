import styled from 'styled-components';
import View from '../View/View';

const StyledWorkspace = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

interface WorkspaceProps {
    views?: any[];
}

const Workspace = ({ views }: WorkspaceProps) => {
    return (
        <StyledWorkspace>
            {views?.map((v) => (
                <View key={v.id} viewId={v.id} />
            ))}
        </StyledWorkspace>
    );
};

export default Workspace;
