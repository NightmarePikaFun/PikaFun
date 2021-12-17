import React, {useEffect, useState} from "react"
import styled from "styled-components"

import colors from '../colors'
import typo from '../typo'
import { Link } from "wouter"
import api from "../api";
import Spinner from "./Spinner";
import {hrefTo} from "@storybook/addon-links";

const PollListItemContainers = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.almostWhite};
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  }
`

const Wrapper = styled.div`
  width: 94%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 16px 26px 16px 16px;
`

const PollLetters = styled.div`
  ${typo.pollLetters};
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 12px;
  background: ${colors.grayBlue};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${colors.brightPrimary};
`

const Label = styled.div`
    ${typo.label1};
`

const Divchik = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
`

const Text = styled.div`
  ${typo.body1};
  width: 40%;
  color: ${colors.mainText};
  align-items: center;
  align-content: center;
  justify-content: center;
`

const AnyValue = styled.div`
  text-align: center;
  color: #9DA9B7;
  font-size: 10px;
`

const IconLink = styled.svg`
  &:hover > path {
   fill: #000000;
};
  margin-top: 4px;
`

const IconTrash = styled.svg`
  &:hover > path {
    fill: #F04F2B;
  };
  margin-top: 4px;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

function Delete(id, refresh){
    console.log('Del')
    api.deletePoll(id).then(document.location.href = "/")//document.location.href = "/")////)
    //window.location.href("/");

}

const PollListItemObj = ({letters, question, votes,days,link, reload}) => (
  <PollListItemContainers>
    <Wrapper>
      <PollLetters>{letters}</PollLetters>
        <Container>
            <Link href={"/poll/:"+link}><Text>{question}</Text></Link>
                <Divchik>
                    <Label>Data</Label>
                    <AnyValue>{days} ago</AnyValue>
                </Divchik>
            <Divchik>
                <Label>Votes</Label>
                <AnyValue>{votes} users</AnyValue>
            </Divchik>
            <div>
                <IconLink onClick={()=>{navigator.clipboard.writeText(window.location+"poll/:"+link)}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.47186 9.42136L4.31457 8.57864C4.70707 8.18615 5.34343 8.18615 5.73593 8.57864C6.10039 8.9431 6.12643 9.51784 5.81403 9.91234L5.73593 10L4.89322 10.8427C3.71573 12.0202 3.71573 13.9293 4.89322 15.1068C6.02866 16.2422 7.84437 16.2828 9.0284 15.2284L9.15729 15.1068L10 14.2641C10.3925 13.8716 11.0289 13.8716 11.4214 14.2641C11.7858 14.6285 11.8119 15.2033 11.4995 15.5978L11.4214 15.6854L10.5786 16.5281C8.61616 18.4906 5.43435 18.4906 3.47186 16.5281C1.56102 14.6173 1.51074 11.5505 3.32101 9.57878L3.47186 9.42136ZM9.42136 3.47186C11.3838 1.50938 14.5657 1.50938 16.5281 3.47186C18.4906 5.43435 18.4906 8.61616 16.5281 10.5786L15.6854 11.4214C15.2929 11.8139 14.6566 11.8139 14.2641 11.4214C13.8716 11.0289 13.8716 10.3925 14.2641 10L15.1068 9.15729C16.2843 7.9798 16.2843 6.07071 15.1068 4.89322C13.9293 3.71573 12.0202 3.71573 10.8427 4.89322L10 5.73593C9.6075 6.12843 8.97114 6.12843 8.57864 5.73593C8.18615 5.34343 8.18615 4.70707 8.57864 4.31457L9.42136 3.47186ZM10.4214 8.15729C10.8139 7.76479 11.4502 7.76479 11.8427 8.15729C12.2352 8.54978 12.2352 9.18615 11.8427 9.57864L9.57864 11.8427C9.18615 12.2352 8.54978 12.2352 8.15729 11.8427C7.76479 11.4502 7.76479 10.8139 8.15729 10.4214L10.4214 8.15729Z" fill="#BFCCE0"/>
                </IconLink>

                <IconTrash onClick={()=>{Delete(link, reload)}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 8C15.5523 8 16 8.44772 16 9V15C16 16.6569 14.6569 18 13 18H7C5.34315 18 4 16.6569 4 15V9C4 8.44772 4.44772 8 5 8H15ZM14 10H6V15C6 15.5523 6.44772 16 7 16H13C13.5523 16 14 15.5523 14 15V10ZM7 3C7 2.44772 7.44772 2 8 2H12C12.5523 2 13 2.44772 13 3V4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4H7V3Z" fill="#BFCCE0"/>
                </IconTrash>
            </div>
        </Container>
    </Wrapper>
  </PollListItemContainers>
)


export default class PollListItem extends React.Component{
    render() {
        let {letters, question, votes, days, link, reload} = this.props
        return <PollListItemObj letters={letters} question={question} votes={votes} days={days} link={link} reload={reload}/>
    }
}