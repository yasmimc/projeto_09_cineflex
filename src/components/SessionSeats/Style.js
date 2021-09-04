import styled from 'styled-components';


const Container = styled.div`

display: flex;
flex-direction: column;

align-items: center;

.submit {
    width: 225px;
    height: 42px;
    left: 72px;
    top: 688px;

    background: #E8833A;
    border-radius: 3px;
    border: none;

    font-size: 18px;
    color: #FFFFFF;
}
`

const Labels = styled.ul`
    display: flex;
    justify-content: space-around;
    width: calc(100vw - 60px);


li {
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
}

p {
    font-size: 13px;
    color: #4E5A65;
}

.circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.selected {
    background-color: #8DD7CF !important;
    border: 1px solid #1AAE9E;
}

.available {
    background-color: #C3CFD9;
    border: 1px solid #7B8B99;
}

.unavailable {
    background-color: #FBE192;
    border: 1px solid #F7C52B;
}`

const Buttom = styled.button`

background-color:${(props)=>(!props.isAvailable? '#FBE192' : (props)=>(props.isSelected ? '#8DD7CF' : '#C3CFD9'))};

border-radius: 50%;
border: 1px solid #808F9D;
width: 26px;
height: 26px;
margin: 9px 4px;

font-size: 11px;
`

const Forms = styled.div`

width: calc(100vw - 60px);
margin: 0 ;
margin-top: 30px;


p {
    font-size: 18px;
}

input{
    height: 51px;
    width: 100%;

    color: #AFAFAF;
    font-size: 18px;
    font-style: italic;

    padding-left: 18px;
    margin-bottom: 10px;


    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 3px;
}`

export {
    Container,
    Labels,
    Buttom,
    Forms
}