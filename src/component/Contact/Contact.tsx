import styled from "styled-components";

const StyledContact = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Contact = () => {
    return  <StyledContact>
        <img style={{width: "525px", height: "280px"}} src="hoth/contact.png" />
    </StyledContact>
}

export default Contact;