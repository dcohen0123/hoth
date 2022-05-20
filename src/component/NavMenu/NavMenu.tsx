import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IState } from '../../interface/IState';
import { Align, NavItemType } from '../../interface/INavItem';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import ExportMenu from '../ExportMenu/ExportMenu';
import BrowseMenu from '../BrowseMenu/BrowseMenu';
import LearnMenu from '../LearnMenu/LearnMenu';
import MoreMenu from '../MoreMenu/MoreMenu';
import UserMenu from '../User/User';
import HelpMenu from '../Help/Help';
import SettingsMenu from '../Settings/Settings';

export const menuMap: Map<NavItemType, JSX.Element> = new Map<NavItemType, JSX.Element>([
    [NavItemType.DashBoard, <DashboardMenu />],
    [NavItemType.Export, <ExportMenu />],
    [NavItemType.Browse, <BrowseMenu />],
    [NavItemType.Learn, <LearnMenu />],
    [NavItemType.More, <MoreMenu />],
    [NavItemType.User, <UserMenu />],
    [NavItemType.Help, <HelpMenu />],
    [NavItemType.Settings, <SettingsMenu />]
])

const StyledNavMenu = styled.div<{open: boolean}>`
    width: ${props => props.open ? "210px" : "0px"};
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