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


export default class NewPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            smallD: []
        };
        this.AddDivchik = this.AddDivchik.bind(this);
    }

    CreateDivchik(){
        if(this.state.smallD.length<0) {
            let arr = []
            let num = 1
            arr.push(<SmallDivchik>
                <Option placeholder={"Eg.Option " + num} labelText={"Option " + num}/>
            </SmallDivchik>);
            num += 1
            arr.push(<SmallDivchik>
                <Option placeholder={"Eg.Option " + num} labelText={"Option " + num}/>
            </SmallDivchik>)
            this.setState({smallD: arr})
            this.setState({number: num})
            this.render();
        }
    }

    AddDivchik(){
        console.log("+")
        let arr = this.state.smallD
        let num = this.state.number
        num+=1
        arr.push(<SmallDivchik>
            <Option placeholder={"Eg.Option "+num} labelText={"Option "+num}/>
        </SmallDivchik>)
        this.setState({smallD: arr})
        this.setState({number:num})
        this.render();
    }


    render() {
        this.CreateDivchik();
        return (
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
                        {this.state.smallD}
                        <SmallDivchik onClick={this.AddDivchik}>
                            <Label>+ Add another option</Label>
                        </SmallDivchik>
                    </PollListItemContainer>
                </WidgetWithTitle>
                <ButtonDiv><Button>Create poll</Button></ButtonDiv>
            </BigDivchik>
        )
    }
}
