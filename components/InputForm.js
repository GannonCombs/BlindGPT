// components/InputForm.js
import React from 'react'
import inputFormStyles from '../styles/InputForm.module.css'

const InputForm = ({ onPromptSubmit }) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    // const audio = new Audio('/Blind.wav');
    // audio.play();
    const prompt = event.target.elements.user_input.value
    onPromptSubmit(prompt)
  }

  return (
    <form className={inputFormStyles.inputForm} onSubmit={handleSubmit}>
      <label htmlFor="user_input">You:</label>
      <br />
      <div className={inputFormStyles.inputGroup}>
        <input type="text" id="user_input" name="user_input" />
        <button type="button" className={inputFormStyles.recordButton}>
          ⏺️
        </button>
      </div>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default InputForm
