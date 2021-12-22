import React, {useEffect, useState} from "react"
import styled from "styled-components"

import colors from '../colors'
import typo from '../typo'
import WidgetWithTitle from "../components/WidgetWithTitle"
import api from "../api";
import Spinner from "../components/Spinner";
import OptionLine from "../components/OptionLine";
import Button from "../components/Button";

const ButtonDiv = styled.div`
    max-width: 520px;
  margin-right: 40%;
  margin-left: 40%;
  margin-top: 42px;
`

const BigDivchik = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
`
const colorsMap = [
    "#F04F2B","#24CE86","#A160FC","#FFC700","#1A1B29","#2CBDFB","#A66999","#73B761","#FE6DB6","#CB00B2"
]

function voteVote(key, id){
    console.log("Fetch")
    console.log(key)
    console.log(id.id)
    api.voteForPoll(key,id.id)
}

export default function Poll({params}) {
    const [polls, setPoll] = useState(null)
    const [optis, setOptions] = useState(null)
    const [allVotes, setAllVotes] = useState(null)
    const [arrVotes, setArrVotes] = useState(null)
    const [voted, setVoted]= useState(null)
    let id = params.pollId;
    id = id.split(':');
    let key = id[1]
    let number = 0

    useEffect(()=>{
        api.getItem(key).then((data) => {setPoll(data.question)})
        api.getItem(key).then((data) => {setVoted(data.hasVoted)})
        api.getItem(key).then((data) => {setOptions(data.options)})
        api.getItem(key).then((data) => {setAllVotes(data.votes)})
        api.getItem(key).then((data) => {setArrVotes(data.results)})

        //setPoll(data)).
    },[])
    let optionArr = []
    let idName = []
    if(optis != null && allVotes!=null && arrVotes!=null) {
        optis.map(({id, title}) => {
            let res = arrVotes[id]
            if(res==undefined)
            {
                res=0
            }
            let miniOpt = {
                id: {id},
                colors: colorsMap[number],
                text: title,
                result: res,
                active: false,
                vote: allVotes,
            }
            idName.push({id})
            number += 1
            optionArr.push(miniOpt)
        })}
    let headerText = allVotes+" users votes"
    let knopa = <></>
    if (!voted)
    {
        knopa = <Button>Submit vote</Button>
    }
    let selectId;
    return (
      <>
      <BigDivchik>
        <WidgetWithTitle
            header={polls}
            text={headerText}
            maxWidth="520px"
        >
            {optionArr.map(({text,colors, active, result, vote,id})=>(
            <OptionLine text={text} color={colors} result={result} active={active} vote={vote} onClick=
                {function yepClick(){
                //api.voteForPoll(key,id);
                    selectId=id;
                 console.log("Vote+");
            }}/>
            ))}
        </WidgetWithTitle>
      </BigDivchik>
              <ButtonDiv onClick={()=>voteVote(key,selectId)}>
                  {knopa}
              </ButtonDiv>
      </>
      //TODO Взять хук из апи и добавить отрисовкой сюды
  )
}
