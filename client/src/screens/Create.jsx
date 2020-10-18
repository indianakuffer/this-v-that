import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { createMatch } from '../services/matches'
import { useSpring, animated } from 'react-spring'

const StyledForm = styled(animated.form)`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 90vw;
  input {
    width: 100%;
    height: 35px;
    margin: 10px 0;
    border: none;
    padding: 3px 10px;
    border-radius: 5px;
    color: white;
    font-size: 18px;
    ::placeholder {
      color: rgba(255,255,255,0.5);
    }
  }
`
const Input1 = styled.input`
  background: ${props => props.background};
`
const Input2 = styled.input`
  background: ${props => props.background};
`
const Square = styled.div`
  height: 20px;
  width: 20px;
  margin: 2px;
  border-radius: 5px;
  background: ${props => props.color};
`
const ColorPicker = styled.div`
  display: flex;
  margin-bottom: 15px;
`
const CloseButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 25px;
  color: grey;
  border: none;
  top: 5px;
  left: 5px;
  background: none;
  padding: 0px;
`
const StyledSubmit = styled.button`
  margin-top: 20px;
  border: none;
  padding: 7px 19px;
  border-radius: 5px;
  background: #3d89a1;
  color: white;
  letter-spacing: 0.05rem;
`
const colorList = {
  'Ruby Red': '#A61120',
  'Dark Goldenrod': '#BD8C0F',
  'Ao English': '#237718',
  'Bottle Green': '#2C634B',
  'Black Olive': '#484538',
  'Blue Munsell': '#048BA8',
  'Sapphire Blue': '#2C699A',
  'Dark Slate Blue': '#54478C',
  'Plum': '#8F3985',
  'Gunmetal': '#182D39'
}

export default function Create(props) {
  let [formData, setFormData] = useState({ option1: '', option2: '', option1Color: 'slateblue', option2Color: 'indianred' })
  let [selectColor, setSelectColor] = useState('slateblue')
  let [selectColor2, setSelectColor2] = useState('indianred')
  let history = useHistory()
  const spring = useSpring({ transform: 'translateY(0vh)', from: { transform: 'translateY(-100vh)' } })

  const updateColor = (name, value) => {
    if (name === 'option1Color') {
      setSelectColor(value)
    } else {
      setSelectColor2(value)
    }
    setFormData({ ...formData, [name]: value })
  }
  const handleChange = (e) => {
    let val = e.target.value
    let name = e.target.name
    setFormData({ ...formData, [name]: val })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.option1.length > 30 || formData.option2.length > 30) {
      alert('Please keep options 30 characters or less.')
      return
    }
    let response = await createMatch(props.userInfo._id, formData)
    history.push(`/${response._id}`)
  }

  return (
    <StyledForm onSubmit={handleSubmit} style={spring} autoComplete="off" onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={props.closeFunction}>x</CloseButton>
      <Input1 name='option1' placeholder='this' type='text' background={selectColor} onChange={handleChange} />
      <ColorPicker>
        {Object.keys(colorList).map(color => {
          let thisColor = colorList[color]
          return (<Square color={thisColor} onClick={() => { setSelectColor(thisColor); updateColor('option1Color', thisColor) }} key={`color1-${thisColor}`} />)
        })}
      </ColorPicker>
      <Input2 name='option2' placeholder='that' type='text' background={selectColor2} onChange={handleChange} />
      <ColorPicker>
        {Object.keys(colorList).map(color => {
          let thisColor = colorList[color]
          return (<Square color={thisColor} onClick={() => { setSelectColor2(thisColor); updateColor('option2Color', thisColor) }} key={`color2-${thisColor}`} />)
        })}
      </ColorPicker>
      <StyledSubmit>Submit</StyledSubmit>
    </StyledForm>
  )
}
