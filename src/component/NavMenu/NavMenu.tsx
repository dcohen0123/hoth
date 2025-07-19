import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IState } from '../../types/IState';
import { Align, NavItemType } from '../../types/INavItem';
import UserMenu from '../User/User';
import HelpMenu from '../Help/Help';
import SettingsMenu from '../Settings/Settings';
import WorkflowMenu from '../WorkflowMenu/WorkflowMenu';

export const menuMap: Map<NavItemType, JSX.Element> = new Map<NavItemType, JSX.Element>([
    [NavItemType.Workflow, <WorkflowMenu />],
    [NavItemType.User, <UserMenu />],
    [NavItemType.Help, <HelpMenu />],
    [NavItemType.Settings, <SettingsMenu />]
])

const StyledNavMenu = styled.div<{open: boolean}>`
    width: ${props => props.open ? "200px" : "0px"};
    transition: width .2s;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ccc;
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
`;

const NavMenu = () => {
    const selected = useSelector((state: IState) => state.navManager?.selected)
    const menu: any = selected ? menuMap.get(selected?.type) : null
    return <StyledNavMenu open={!!menu && selected?.align === Align.Top}>{menu}</StyledNavMenu>;
}

export default NavMenu;