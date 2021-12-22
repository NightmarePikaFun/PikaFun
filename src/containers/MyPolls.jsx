import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { Link } from "wouter"
import Spinner from "../components/Spinner"
import Button from "../components/Button";
import PollListItem from "../components/PollListItem"

import api from '../api'
import colors from '../colors'
import typo from '../typo'
import * as Console from "console";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 560px;
  margin: 70px auto 24px;
`

const H2 = styled.h2`
  ${typo.h2};
  color: ${colors.mainText};
  
  text-align: left;
`

const PollList = styled.div`
  max-width: 560px;
  margin: 0 auto;
`

const NewPollButton = styled.button`
  background: none;
  border: 0;
  color: #8897AD;
  border-radius: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  padding-right: 12px;
  &:hover{
    background: #DDE5FD;
    color: #1F5BE4;
    cursor: pointer;
  }
`

const Wrapper = styled.div`
  width: 94%;
  height: 50%;
  display: flex;
  flex-direction: column;
  background-color: #F1F3F5;
  border: 1px dashed #8897AD;
  box-sizing: border-box;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  max-width: 560px;
  margin: 0 auto;
  margin-top: 32px;
  padding: 16px;;
`

const Text = styled.div`
  ${typo.body1};
  color: ${colors.secondaryTextOnGray};
  text-align: center;
  max-width: ${props => props.maxWidth};
  margin: 0 auto;
  margin-top: 8px;
  max-width: 300px;
`

const ButtonDiv = styled.div`
    max-width: 200px;
  margin-top: 28px;
`

export default class MyPolls extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            polls: [],
            test: [],
            value: 0
        }
    }

    componentDidMount() {
        api.getPolls().then((data) => data.json().then((data)=>this.setState({polls: data,test:[]})))
    }
    Delete(id){
        console.log('Del')
        api.deletePoll(id).then((data)=>this.componentDidMount()).then(()=>this.render())

    }


    returnVal() {
        let asd=[]
        console.log("step 1")
        asd = this.state.polls.polls
        if(this.state.test.length==0) {
            if(asd!=undefined) {
                console.log('test fill')
                this.setState({test: asd})
            }
        }
        console.log(asd!=undefined)
        if(asd==undefined)
        {
            if(this.state.test.length>0) {
                console.log('test applied')
                asd = this.state.test
            }
        }
        let newPolls = []
        if(asd!=undefined) {
            console.log("step 2")
            console.log(asd)
            console.log(asd[0])
            asd.forEach((tip) => {
                let dataDay = tip.createdAt.split('T')
                dataDay = dataDay[0].split('-')
                dataDay = dataDay[2]
                if (dataDay > 31) {
                    dataDay = (dataDay / 31) + " months"
                } else {
                    dataDay = dataDay + " days"
                }
                let miniPoll = {
                    id: tip.id,
                    letters: tip.letters,
                    question: tip.question,
                    data: dataDay,
                    votes: tip.votes,
                    link: tip.id
                };
                newPolls.push(miniPoll);
            })
            if (asd.length == 0) {
                console.log("step 3")
                console.log(this.state.poll)
                console.log("parser")
                let text = "There is no created polls yet. Create a poll and and share a link with anyone and gather votes in seconds."
                let buttonText = "Create a new poll"
                return (
                    <>
                        <Header>
                            <H2>Your Polls</H2>
                            <Link href="/new"><NewPollButton>New poll</NewPollButton></Link>
                        </Header>
                        <Wrapper>
                            <Text maxWidth={560}>{text}</Text>
                            <ButtonDiv>
                                <Link href="/new">
                                    <Button>
                                        {buttonText}
                                    </Button>
                                </Link>
                            </ButtonDiv>
                        </Wrapper>
                    </>
                )
            } else {
                console.log("step 4")
                console.log(asd.length + "l")
                return (
                    <>
                        <Header>
                            <H2>Your Polls</H2>
                            <Link href="/new"><NewPollButton>New poll</NewPollButton></Link>
                        </Header>
                        <PollList>
                            {newPolls.map(({id, letters, question, data, votes, link}) => (
                                <PollListItem
                                    key={id}
                                    letters={letters}
                                    question={question}
                                    votes={votes}
                                    days={data}
                                    link={link}
                                    reload={(val) => {
                                        this.setState(
                                            {test: asd.filter((x) => {console.log(x.id!==val);this.Delete(val); return x.id !== val})}
                                        )
                                    }}
                                />
                            ))}
                        </PollList>
                    </>
                )
            }
        }
        return <div/>
    }

    render(){
        let kop = this.returnVal()
        console.log('step render')
        console.log(this.state.test)
        return kop
    }

}
