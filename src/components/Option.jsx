import React from "react"
import styled from "styled-components"

import colors from '../colors'
import typo from '../typo'
import Input from "./Input";

const Label = styled.div`
    ${typo.label1};
  margin-bottom: 9px;
`

const Thrash = styled.svg`
  margin: 8px;
  &:hover > path {
    fill: #F04F2B !important;
  };
`

const Opt = styled.div`
    cursor: pointer;
  &:hover > div > svg >path{
    fill: #DFE1E4
  }
`

const Divchik = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`

const ErrorText = styled.div`
  color: red;
`

const OptionTag = ({placeholder, labelText, errorTag,isError}) =>(
    <Opt>
        <Label>{labelText}</Label>
        <Divchik>
            <Input placeholder = {placeholder} isError={isError}/>
            <Thrash width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 0C9.55229 0 10 0.447715 10 1V2H13C13.5523 2 14 2.44772 14 3C14 3.55228 13.5523 4 13 4H12V9C12 10.6569 10.8807 12 9.5 12H4.5C3.11929 12 2 10.6569 2 9V4H1C0.447715 4 0 3.55228 0 3C0 2.44772 0.447715 2 1 2H4V1C4 0.447715 4.44772 0 5 0H9ZM5 4C4.48716 4 4.06449 4.38604 4.00673 4.88338L4 5V9C4 9.55229 4.44772 10 5 10C5.51284 10 5.93551 9.61396 5.99327 9.11662L6 9V5C6 4.44772 5.55228 4 5 4ZM9 4C8.48716 4 8.06449 4.38604 8.00673 4.88338L8 5V9C8 9.55229 8.44771 10 9 10C9.51284 10 9.93551 9.61396 9.99327 9.11662L10 9V5C10 4.44772 9.55229 4 9 4Z" fill="#00000"/>
            </Thrash>
        </Divchik>
        {errorTag}
    </Opt>
);

export default class Option extends React.Component
{
    constructor(props)
    {
        super(props)
    }


    render() {
        const { placeholder, labelText, isError} = this.props
        let message = <ErrorText/>
        if(isError == true)
        {
            message = <ErrorText>Should be a vaild name</ErrorText>
        }
        return <OptionTag placeholder={placeholder} labelText={labelText} errorTag={message} isError = {isError}/>
    }
}