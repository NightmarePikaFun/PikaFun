import React from 'react'
import styled from 'styled-components'

import colors from '../colors'
import typo from '../typo'
import Spinner from "./Spinner";

const ButtonTag = styled.button`
  ${typo.button};
  margin-top: 8px;
  width: 100%;
  border-radius: 4px;
  user-select: none;
  cursor: ${props=>props.disb ? "not-allowed" : "pointer"};
  transition: all .2s ease-in-out;
  display: inline-block;
  text-align: center;
  padding: 14px 13px;
  background: ${props=>props.disb ? "#B6C5DC" : colors.brightPrimary};
  color: ${colors.white};
  border: 1px solid transparent;
  &:hover {
    background: ${props=>props.disb ? "#B6C5DC" : colors.mediumPrimary};
  }
`

const SupportDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
`

export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    const {children, onClick, disabled, loading} = this.props;
    let dis = false;
    if(disabled==true)
    {
      dis = true;
    }
    let text = children
    if(loading==true)
    {
      text = <SupportDiv><Spinner/></SupportDiv>
    }
  return (
    <ButtonTag onClick={onClick} disb={dis}>{text}</ButtonTag>
  )}
}