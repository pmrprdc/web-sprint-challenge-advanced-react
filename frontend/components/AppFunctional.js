import React from 'react'
import { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, changeState] = useState();
  const [index, setIndex] = useState(4);
  const [initialSteps, setInitialSteps] = useState(0);
  const [initialMessage, setInitialMessage] = useState("");
  const [email, setEmail] = useState(initialEmail);

  function getXY(index) {
    if(index < 0 || index > 8) {
      return [4,4]
    }
    const coordinatesTable = {
      0: [1,1],
      1: [2,1],
      2: [3,1],
      3: [1,2],
      4: [2,2],
      5: [3,2],
      6: [1,3],
      7: [2,3],
      8: [3,3]

    }
    return coordinatesTable[index];
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage(index) {
      return (`Coordinates (${getXY(index)[0]}, ${getXY(index)[1]})`)
    
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setIndex(4);
    setInitialSteps(0)
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    const [x,y] = getXY(index)
    if(evt.target.id === "up"){
     
      if(y!==1){
        setInitialMessage("")
        setIndex(index-3)
        setInitialSteps(initialSteps+1)
      } else {
        setInitialMessage("You can't go up")
      }
    }
    if(evt.target.id === "down"){
     
      
      if(y!==3){
        setInitialMessage("")
        setIndex(index+3)
        setInitialSteps(initialSteps+1)
      } else {
        setInitialMessage("You can't go down")
      }
     }
     if(evt.target.id === "right"){

        if(x!==3){
          setInitialSteps(initialSteps+1)
          setInitialMessage("")
          setIndex(index+1)
        } else {
          setInitialMessage("You can't go right")
        }
     }
     if(evt.target.id === "left"){
      if(x!==1){
        setInitialSteps(initialSteps+1)
        setInitialMessage("")
        setIndex(index-1)
      } else {
        setInitialMessage("You can't go left")
      }
     }
    

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    setEmail(evt.target.value)
    console.log(email)
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const [x,y] = getXY(index)
    console.log(x,y)
    axios.post("http://localhost:9000/api/result",{ "x": x, "y": y, "steps": initialSteps, "email": email })
    .then(res=>{
      setInitialMessage(res.data.message)
      
    })
    .catch(err=>{
      console.log(err.message)
      setInitialMessage(err.response.data.message)
    })
    // Use a POST request to send a payload to the server.


    ///reseting input field
    setEmail("")
  }
  
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage(index)}</h3>
        <h3 id="steps">You moved {initialSteps} time{initialSteps === 1 ? "" : "s"}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{initialMessage}</h3>
      </div>
      <div id="keypad">
        <button onClick={move}id="left">LEFT</button>
        <button onClick = {move} id="up">UP</button>
        <button onClick = {move} id="right">RIGHT</button>
        <button onClick = {move} id="down">DOWN</button>
        <button onClick = {reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit" value="Submit"></input>
      </form>
    </div>
  )
      }
