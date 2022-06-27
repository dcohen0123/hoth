import styled from "styled-components";
import { INavList } from "../../interface/INavList";
import { INavListItem } from "../../interface/INavListItem";

const StyledNavList = styled.ul`
    background: #f0f0f0;
    height: 100%;
    list-style: none;
    padding: 0px;
    margin: 0px;
    font-size: 12px;
`;

const StyledNavListItem = styled.li`
    padding: 7px;
    background: #fff;
    :active {
        background: #e9e9e9;
    }
    :last-child {
        border-bottom: 1px solid #e3e3e3;
    }
`;

const NavList = ({items, onSelect}: INavList) => {
    const handleClick = (item: INavListItem) => {
        return () => onSelect(item);
    }
    return <StyledNavList>
        {items?.map(x => <StyledNavListItem key={x.id} onClick={handleClick(x)}><strong>{x.name}</strong></StyledNavListItem>)}
    </StyledNavList>
}

export default NavList;