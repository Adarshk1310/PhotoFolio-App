import styled from 'styled-components';
import Logo from './Images/Logo.png'
const OuterDiv = styled.div`
width:100%;
height:80px;
background-color:black;
display:flex;
justify-content:space-between;
color:white;
`
const FirstDiv =styled.div`

height:100%;
display:flex;

`
const SecondDiv =styled.div`
height:100%;
padding-right:10px;
margin-right:10px;
margin-top:0;
padding-top:10px;

`
const PhotoDiv =styled.div`
height:100%;
width:100px;
margin-top:5px;
`
const Img =styled.img`
width:80%;
height:90%;
`
const Heading =styled.h1`

font-family:"Lucida Handwriting",Cursive;

`
const MyName =styled.h2`
margin:0px;
padding:0px;
`
const Creator =styled.h3`
margin:0px;
padding:0px;
`

const Header=()=>{

    return  <OuterDiv>

            <FirstDiv>
                <PhotoDiv><Img src={Logo} alt="PhotoFolioLogo"/></PhotoDiv>
                <Heading>PhotoFolio</Heading>

            </FirstDiv>
            <SecondDiv>
                <Creator>Created By:</Creator>
                <MyName>Adarsh Kumar</MyName>
            </SecondDiv>
        
    </OuterDiv>
}

export default Header;