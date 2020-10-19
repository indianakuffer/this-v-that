import React, { useState } from 'react'
import styled from 'styled-components'
import { getMatches, searchMatches } from '../services/matches'

const Container = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e3e3e3;
  width: 90%;
  margin: 10px auto;
  border-radius: 10px;
  height: 30px;
  padding: 0 10px;
  overflow: hidden;
  button {
    border: none;
    background-repeat: no-repeat;
    background-size: contain;
    width: 20px;
    height: 20px;
    background-color: transparent;
    background-image: url('${require('../images/search.svg')}');
  }
`
const StyledInput = styled.input`
  border: none;
  background: transparent;
  flex-grow: 1;
  height: 30px;
  margin-right: 15px;
`

export default function Searchbar(props) {
  let [formData, setFormData] = useState('')

  const handleChange = (e) => {
    setFormData(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response
    if (!formData) {
      response = await getMatches()
    } else {
      response = await searchMatches(formData)
    }
    props.setMatchList(response)
  }

  return (
    <Container onSubmit={handleSubmit} autoComplete='off'>
      <StyledInput placeholder='search' onChange={handleChange} />
      <button></button>
    </Container>
  )
}
