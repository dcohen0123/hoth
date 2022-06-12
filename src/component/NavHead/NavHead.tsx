import styled from "styled-components";
//@ts-ignore
import { EntypoChevronThinLeft } from 'react-entypo';
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../interface/IState";
import { NavItemSelected } from "../../redux/Nav/NavActions";

const StyledDiv = styled.div`
    padding: 6.5px 4px 6.5px 7px;
    background: #636363;
    color: #fff;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
`;

const StyledIcon = styled.div`
    color: #fff;
    display: flex;
    align-items: center;
    svg {
        width: 15px !important;
        height: 15px !important;
    }
`

const NavHead = () => {
    const selected = useSelector((state: IState) => state.navManager?.selected)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch({type: NavItemSelected, payload: null})
    }
    return <StyledDiv>
        <strong>{selected?.name}</strong>
        <StyledIcon onClick={handleClick}><EntypoChevronThinLeft /></StyledIcon>
    </StyledDiv>
}

export default NavHead;