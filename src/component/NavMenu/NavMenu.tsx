import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IState } from '../../interface/IState';
import { NavItemType } from '../../interface/INavItem';
import DashboardMenu from '../DashboardMenu/DashboardMenu';

export const menuMap: Map<NavItemType, JSX.Element> = new Map<NavItemType, JSX.Element>([
    [NavItemType.DashBoard, <DashboardMenu />],
    // [NavbarItemType.Export, <ExportMenu />],
    // [NavbarItemType.Browse, <BrowseMenu />],
    // [NavbarItemType.Learn, <LearnMenu />],
    // [NavbarItemType.More, <MoreMenu />],
])

const StyledNavMenu = styled.div<{open: boolean}>`
    width: ${props => props.open ? "210px" : "0px"};
    transition: width .2s;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #cccccc;
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
`;

const NavMenu = () => {
    const selected = useSelector((state: IState) => state.navManager?.selected)
    const menu = selected ? menuMap.get(selected?.type) : null
    return <StyledNavMenu open={!!menu}>{menu}</StyledNavMenu>
}

export default NavMenu;