import styled from 'styled-components';
//@ts-ignore
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../types/IState';
import { Tooltip } from 'antd';
import { NavItemSelected } from '../../state/Nav/NavActions';
import { Align, INavItem, NavItemType } from '../../types/INavItem';
import aia from '../../assets/aia.png'
import { EditFilled, SettingFilled, UserOutlined } from '@ant-design/icons';
import { Help } from '@mui/icons-material';

const StyledNavbar = styled.div`
    display: inline-flex;
    height: 100%;
    background: #333;
    text-align: center;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 8px;
`

const StyledImg = styled.img`
    width: 25px;
    margin: 10px 5px 10px 5px;
`

const StyledIcon = styled.div<{selected?: boolean, indicator?: boolean}>`
    color: #fff;
    position: relative;
    padding: 8.5px 0px;
    svg {
        width: 16px !important;
        height: 16px !important;
    }
    ${props => props.selected && props.indicator && `:before {
        content: "";
        position: absolute;
        background: #fff;
        width: 2px;
        height: 32px;
        left: 0;
        top: calc(50% - 16px);
    }`}
`

export const iconMap: Map<NavItemType, JSX.Element> = new Map<NavItemType, JSX.Element>([
    [NavItemType.User, <UserOutlined />],
    [NavItemType.Help, <Help />],
    [NavItemType.Settings, <SettingFilled />],
    [NavItemType.Workflow, <EditFilled />]
])

const Navbar = () => {
    const selected = useSelector((state: IState) => state.navManager?.selected)
    const items = useSelector((state: IState) => state.navManager?.items)
    const dispatch = useDispatch()
    const handleClick = (item: INavItem) => {
        return () => dispatch({type: NavItemSelected, payload: item})
    }
    const getIcon = (x: INavItem) => {
        return <Tooltip key={x.id} title={x.name} placement="right">
            <StyledIcon onClick={handleClick(x)} selected={selected?.id === x?.id} indicator={selected?.align === Align.Top}>
                {iconMap.get(x?.type)}
            </StyledIcon>
        </Tooltip>
    }
    return <StyledNavbar>
        <div>
            <StyledImg src={aia} />
            {items?.filter(x => x.align === Align.Top)?.map(x => getIcon(x))}
        </div>
        <div>
            {items?.filter(x => x.align === Align.Bottom)?.map(x => getIcon(x))}
        </div>
    </StyledNavbar>
}

export default Navbar;