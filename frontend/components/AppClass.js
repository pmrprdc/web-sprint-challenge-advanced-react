import React from 'react'
import axios from 'axios'
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}



export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  constructor() {
    super();
    this.state = initialState;
  }

  getXY = (index) => {
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

  getXYMessage = (index) => {
      const [x, y] = this.getXY(index);
      return `Coordinates (${x},${y})`
      
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    this.setState(initialState)
    // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    const [x,y] = this.getXY(this.state.index)
    this.setState({
      ...this.state,
      message: ""
    })
    if(evt.target.id === "up"){
      if(y!==1){
        this.setState({
          ...this.state, 
          message: "",
          index: this.state.index-3,
          steps: this.state.steps +1
        })
      }else {     
        // setInitialMessage("you can't move up")
        this.setState({
          ...this.state,
          message: "You can't go up"
        })
      }
    }
    if(evt.target.id === "down"){
      if(y!==3){
        this.setState({
          ...this.state, 
          message: "",
          index: this.state.index+3,
          steps: this.state.steps +1
        })
      }else {     
        // setInitialMessage("you can't move up")
        this.setState({
          ...this.state,
          message: "You can't go down"
        })
      }
    }
    if(evt.target.id === "left"){
      if(x!==1){
        this.setState({
          ...this.state, 
          message: "",
          index: this.state.index-1,
          steps: this.state.steps +1
        })
      }else {     
        // setInitialMessage("you can't move up")
        this.setState({
          ...this.state,
          message: "You can't go left"
        })
      }
    }
    if(evt.target.id === "right"){
      if(x!==3){
        this.setState({
          ...this.state, 
          message: "",
          index: this.state.index+1,
          steps: this.state.steps +1
        })
      }else {     
        // setInitialMessage("you can't move up")
        this.setState({
          ...this.state,
          message: "You can't go right"
        })
      }
      
    }
   
    
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    this.setState({
      ...this.state,
      email: evt.target.value
    })
    
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    // Use a POST request to send a payload to the server.
    const[x,y]= this.getXY(this.state.index);
    // evt.preventDefault();
    console.log(x,y)
    // const [x,y] = getXY(index)
     axios.post("http://localhost:9000/api/result", { "x": x, "y": y, "steps": this.state.steps, "email": this.state.email })
     .then(res=>{
      console.log(res.data.message)
      this.setState({
        ...this.state,
        message:res.data.message
      })
     }).catch(err=>{
      this.setState({
        ...this.state,
        message:err.response.data.message
      })
      
     })
    // axios.post("http://localhost:9000/api/result",{ "x": x, "y": y, "steps": 3, "email": email })
    // .then(res=>{
    //   setInitialMessage(res.data.message)
      
    // })
    // .catch(err=>{
    //   console.log(err.message)
    //   setInitialMessage(err.message)
    // })
    ////RESET INPUT FIELD
    this.setState({
      ...this.state,
      email: ""
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage(this.state.index)}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"value="Submit"></input>
        </form>
      </div>
    )
  }
}
