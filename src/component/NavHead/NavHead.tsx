import styled from "styled-components";
//@ts-ignore
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../types/IState";
import { NavItemSelected } from "../../state/Nav/NavActions";
import { ChevronLeft } from "@mui/icons-material";

const StyledDiv = styled.div`
    padding: 6.5px 4px 6.5px 7px;
    background: #414141;
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
        <StyledIcon onClick={handleClick}><ChevronLeft /></StyledIcon>
    </StyledDiv>
}

export default NavHead;