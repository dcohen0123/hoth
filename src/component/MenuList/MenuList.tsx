import styled from "styled-components";
import { INavList } from "../../interface/INavList";
import { INavListItem } from "../../interface/INavListItem";

const StyledMenuList = styled.ul`
    background: #f3f3f3ff;
    height: 100%;
    list-style: none;
    padding: 0px;
    margin: 0px;
    font-size: 12px;
`;

const StyledMenulistItem = styled.li`
    padding: 8px;
    background: #fff;
    :active {
        background: #eeeeee;
    }
`;

const MenuList = ({items, onSelect}: INavList) => {
    const handleClick = (item: INavListItem) => {
        return () => onSelect(item);
    }
    return <StyledMenuList>
        {items?.map(x => <StyledMenulistItem key={x.id} onClick={handleClick(x)}><strong>{x.name}</strong></StyledMenulistItem>)}
    </StyledMenuList>
}

export default MenuList;