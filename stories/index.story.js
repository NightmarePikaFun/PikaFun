import React from 'react'
import {storiesOf} from '@storybook/react'

import Button from '../src/components/Button'
import Input from '../src/components/Input'
import PollListItem from '../src/components/PollListItem'
import {button} from "@storybook/addon-knobs";
import Option from "../src/components/Option";
import OptionLine from "../src/components/OptionLine";

storiesOf('Button', module)
  .add('Button', () => (
    <Button>Add new poll</Button>
  ))
   .add('Button With Spinner', () => (
     <Button loading={true}>Add new poll</Button>
   ))
   .add('Button [disabled]', () => (
     <Button disabled={true}>Add new poll</Button>
   ))
   .add('Button Disabled With Spinner', () => (
     <Button loading={true} disabled={true}>Add new poll</Button>
   ))

storiesOf('Input', module)
  .add('Basic Input', () => (
      <Input/>
))

storiesOf('Question',module)
    .add('Option',()=>{
        const question = [{
            placeholder1: "Eg. Option1",
            text: "Option1",
            err: undefined
        },{
            placeholder1: "Eg. Option1",
            text: "Option1",
            err: true
        }]
        return question.map(({placeholder1,text,err})=>(
            <Option placeholder={placeholder1} labelText={text} isError={err}/>
        ))

    })
    .add('OptionLine',()=>{
        const line =[{
                text:"Option1",
                color:"#FFC700",
                vote:25,
                result:12,
                active:true
            },
            {
                text:"Option2",
                color:"#24CE86",
                vote:25,
                result:2,
                active: false
            },
            {
                text:"Option3",
                color:"#F04F2B",
                vote:25,
                result:6,
                active: false
            },
            {
                text:"Option4",
                color:"#A160FC",
                vote:25,
                result:5,
                active: false
            }]
        return line.map(({text,color,vote,result, active})=>(<OptionLine tittle={text} color={color} vote={vote} result={result} active={active}/>))
    })

storiesOf('PollListItem', module)
  .add('PollListItems', () => {
    const polls = [{
      id: "5fae5f1c68992ec350f6b79d",
      letters: "WF",
      question: "What is your favourite programming language?",
        votes:42,
        days: 7
    }, {
      id: "5fae5f4368992ec350f6b79e",
      letters: "GD",
      question: "Game Development vs Mobile Development",
        votes:42,
        days: 21
    }, {
      id: "5fae8090d43732c81bd9f6bc",
      letters: "CD",
      question: "Cats or Dogs",
        votes:42,
        days:5
    }]

    return polls.map(({id, letters, question,votes,days}) => (
      <PollListItem
        key={id}
        letters={letters}
        question={question}
        votes={votes}
        days={days}
      />
    ))
  })
