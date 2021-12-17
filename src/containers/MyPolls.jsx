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

export default function MyPolls() {
  const [polls, setPolls] = useState(null)
    useEffect(() => {api.getPolls().then((data) => setPolls(data.polls)).then(console.log("-"))
  }, [])
  if (!polls) {
    return <Spinner margin="70px auto"/>
  }

    function abs() {
        useEffect(() => {api.getPolls().then((data) => setPolls(data.polls)).then(console.log("-"))
        }, [])
    }
    let kb = 0
    let output
    console.log("+")
  console.log(polls)
    let newPolls = []
    polls.map(({id,letters, question,createdAt, votes})=> {
        let data = createdAt.split('T')
        data = data[0].split('-')
        data = data[2]
        if(data>31)
        {
            data = (data/31)+" months"
        }
        else
        {
            data = data+" days"
        }
        let miniPoll = {
            id: id,
            letters: letters,
            question: question,
            data: data,
            votes: votes,
            link: id,
            reload: abs
        };
        newPolls.push(miniPoll);
    })
    if(polls.length==0)
    {
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
    }
    else
    {
  return (
    <>
      <Header>
        <H2>Your Polls</H2>
          <Link href="/new"><NewPollButton>New poll</NewPollButton></Link>
      </Header>
      <PollList>
        {newPolls.map(({id, letters, question,data, votes,link, reload}) => (
          <PollListItem
            key={id}
            letters={letters}
            question={question}
            votes={votes}
            days={data}
            link={link}
            reload = {reload}
          />
        ))}
      </PollList>
    </>
  )}
}
