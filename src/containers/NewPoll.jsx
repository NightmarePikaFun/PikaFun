import React from "react"
import styled from "styled-components"

import WidgetWithTitle from "../components/WidgetWithTitle"
import colors from '../colors'
import typo from '../typo'
import Input from "../components/Input";
import Button from "../components/Button";
import Option from "../components/Option";
import OptionLine from "../components/OptionLine";

const Label = styled.div`
    ${typo.label1};
`

const H1 = styled.h1`
  ${typo.h1};
  color: ${colors.mainText};
  margin-top: 40px;
  text-align: center;
`

const PollListItemContainer = styled.div`
  background: ${colors.white};
  box-sizing: border-box;
  cursor: pointer;
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`
const BigDivchik = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
`

const SmallDivchik = styled.div`
  width: 95%;
  &:hover > svg > path{
    fill: #DFE1E4;
  }
`

const ButtonDiv = styled.div`
  margin-top: 32px;
    width: 20%;
`

const Thrash = styled.svg`
  &:hover > path {
    fill: #F04F2B;
  };
`


class NewPollS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            smallD: []
        };
        //this.AddDivchik = this.AddDivchik.bind(this);
    }

    CreateDivchik(){
        let num = this.state.number
        if(num===1) {
            let arr = []
            let placeText = "Eg.Option "+num-1
            let labelText = "Option "+num-1
            let miniText = {
                placeholder: {placeText},
                label: {labelText}
            }
            arr.push(miniText);
            num += 1
            this.setState({smallD: arr,number: num})
        }
    }

    AddDivchik(){
        console.log("+")
        let arr = this.state.smallD
        let num = this.state.number
        num+=1
        let placeText = "Eg.Option "+num-1
        let labelText = "Option "+num-1
        let miniText = {
            placeholder: {placeText},
            label: {labelText}
        }
        arr.push(miniText)
        this.setState({smallD: arr,number:num})
        //this.setState({})
        console.log("compl")
    }

    render() {
        this.CreateDivchik();
        let state = this.state.smallD
        console.log(state)
        return <>
            <BigDivchik>
                <WidgetWithTitle
                    header="New Poll"
                    text="To start a poll just share a link on them with your friends. Once you have one vote it can't be edited anymore."
                    maxWidth="520px"
                >
                    <PollListItemContainer>
                        <SmallDivchik>
                            <Label>Poll question</Label>
                            <Input/>
                        </SmallDivchik>
                        {state.map((placeholder, label)=>{
                            <SmallDivchik>
                                <Option placeholder={placeholder} labelText={label}/>
                            </SmallDivchik>
                        })}
                        <SmallDivchik onClick={()=>this.AddDivchik()}>
                            <Label>+ Add another option</Label>
                        </SmallDivchik>
                    </PollListItemContainer>
                </WidgetWithTitle>
                <ButtonDiv><Button>Create poll</Button></ButtonDiv>
            </BigDivchik>
        </>
    }
}

export default function CreatePoll(){
    return <NewPollS></NewPollS>
}
