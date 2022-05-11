import styled from 'styled-components';
//@ts-ignore
import { EntypoLineGraph, EntypoExport, EntypoDatabase, EntypoBook, EntypoCircleWithPlus, EntypoUser, EntypoHelp, EntypoCog } from 'react-entypo';

const StyledNavbarMenu = styled.div`
    display: inline-flex;
    height: 100%;
    background: #434343ff;
    text-align: center;
    flex-direction: column;
    justify-content: space-between;
`

const StyledImg = styled.img`
    width: 26px;
    margin: 10px 5px 8px 5px;
`

const StyledIcon = styled.div`
    color: #fff;
    margin-bottom: 18px;
    svg {
        width: 17px !important;
        height: 17px !important;
    }
`

const NavbarMenu = () => {
    return <StyledNavbarMenu>
        <div>
            <StyledImg src='logo.webp' />
            <StyledIcon>
                <EntypoLineGraph />
            </StyledIcon>
            <StyledIcon>
                <EntypoExport />
            </StyledIcon>
            <StyledIcon>
                <EntypoDatabase />
            </StyledIcon>
            <StyledIcon>
                <EntypoBook />
            </StyledIcon>
            <StyledIcon>
                <EntypoCircleWithPlus />
            </StyledIcon>
        </div>
        <div>
            <StyledIcon>
                <EntypoUser />
            </StyledIcon>
            <StyledIcon>
                <EntypoHelp />
            </StyledIcon>
            <StyledIcon>
                <EntypoCog />
            </StyledIcon>
        </div>
    </StyledNavbarMenu>
}

export default NavbarMenu;