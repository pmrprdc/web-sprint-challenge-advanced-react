import server from '../../backend/mock-server'
import React from 'react'
import AppFunctional from './AppFunctional'
import AppClass from './AppClass'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'



test(`The Coordinates header renders`, async () => {
  render(<AppClass/>)
  const targetElement = screen.getByText(/Coordinates/i)
  console.log(targetElement)
  expect(targetElement).toBeInTheDocument();
 }
)

test(`The Coordinates header renders as Coordinates (1, 2)
after left click`, async () => {
  render(<AppClass/>)
  
  const leftButton = screen.getByText(/left/i)
  fireEvent.click(leftButton)
  screen.getByText(`Coordinates (1,2)`)
  
 }
)


test(`The LEFT button renders correctly`, async () => {
  render(<AppClass/>)
  
  const leftButton = screen.getByText(/left/i)
  

  expect(leftButton).toBeInTheDocument();
 }
)

test(`When we click right button twice, there is an error message called You can't go right`, async () => {
  render(<AppClass/>)
  
  const rightButton = screen.getByText(/right/i)
  
  fireEvent.click(rightButton)
  fireEvent.click(rightButton)

  screen.getByText("You can't go right")
 
 }
)

test(`Typing inside input field changes it's value`, async ()=>{
  render(<AppClass/>)
  const input = screen.getByRole(/email/i)
  fireEvent.change(input, { target: { value: 'lady@gaga.com' } })
  expect(input).toHaveValue("lady@gaga.com")
  
  

})



// jest.setTimeout(1000) // default 5000 too long for Codegrade
// const waitForOptions = { timeout: 100 }
// const queryOptions = { exact: false }

// let up, down, left, right, reset, submit
// let squares, coordinates, steps, message, email

// const updateStatelessSelectors = document => {
//   up = document.querySelector('#up')
//   down = document.querySelector('#down')
//   left = document.querySelector('#left')
//   right = document.querySelector('#right')
//   reset = document.querySelector('#reset')
//   submit = document.querySelector('#submit')
// }

// const updateStatefulSelectors = document => {
//   squares = document.querySelectorAll('.square')
//   coordinates = document.querySelector('#coordinates')
//   steps = document.querySelector('#steps')
//   message = document.querySelector('#message')
//   email = document.querySelector('#email')
// }

// const testSquares = (squares, activeIdx) => {
//   squares.forEach((square, idx) => {
//     if (idx === activeIdx) {
//       expect(square.textContent).toBe('B')
//       expect(square.className).toMatch(/active/)
//     } else {
//       expect(square.textContent).toBeFalsy()
//       expect(square.className).not.toMatch(/active/)
//     }
//   })
// }

// test('AppFunctional is a functional component, Review how to build a functional component, including useState and passing props.', () => {
//   expect(
//     AppFunctional.prototype &&
//     AppFunctional.prototype.isReactComponent
//   ).not.toBeTruthy()
// })
// test('AppClass is a class-based component, Review how to build a class-based component, such as using “extends”, and constructors', () => {
//   expect(
//     AppClass.prototype &&
//     AppClass.prototype.isReactComponent
//   ).toBeTruthy()
// });

// [AppFunctional, AppClass].forEach((Component, idx) => {
//   const label = idx === 0 ? 'FUNCTIONAL' : 'CLASS-BASED'

//   describe(`${label}`, () => {
//     beforeAll(() => { server.listen() })
//     afterAll(() => { server.close() })
//     beforeEach(() => {
//       render(<Component />)
//       updateStatelessSelectors(document)
//       updateStatefulSelectors(document)
//     })
//     afterEach(() => {
//       server.resetHandlers()
//       document.body.innerHTML = ''
//     })

   
//       test(`[A4 ${label}] Actions: up, right, down
//           Active Square should be index 0`, () => {
//         fireEvent.click(up)
//         fireEvent.click(right)
//         fireEvent.click(down)
//         testSquares(squares, 5)
//       })
      
      
 
   
//       test(`[C5 ${label}] Actions: up, left, left
//           Limit reached message should be "You can't go left"`, () => {
//         fireEvent.click(up)
//         fireEvent.click(left)
//         fireEvent.click(left)
//         expect(message.textContent).toBe("You can't go left")
//       })
    
     
     
   
     
//       test(`[D1 ${label}] Steps counter works correctly`, () => {
//         expect(steps.textContent).toBe("You moved 0 times")
//         fireEvent.click(up)
//         fireEvent.click(up)
//         fireEvent.click(left)
//         expect(steps.textContent).toBe("You moved 2 times")
//         fireEvent.click(right)
//         fireEvent.click(right)
//         expect(steps.textContent).toBe("You moved 4 times")
//         fireEvent.click(down)
//         fireEvent.click(down)
//         fireEvent.click(down)
//         expect(steps.textContent).toBe("You moved 6 times")
//         fireEvent.click(left)
//         fireEvent.click(left)
//         fireEvent.click(left)
//         expect(steps.textContent).toBe("You moved 8 times")
//       })
     
   
  
//       test(`[E5 ${label}] Email input is reset`, () => {
//         fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
//         expect(email).toHaveValue('lady@gaga.com')
//         fireEvent.click(reset)
//         expect(email.value).toBeFalsy()
//       })
  
   
//       test(`[F8 ${label}] Actions: up, right, type valid email, submit
//           Submitting does not reset coordinates nor steps`, async () => {
//         fireEvent.click(up)
//         fireEvent.click(right)
//         fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
//         fireEvent.click(submit)
//         await screen.findByText('lady win #49', queryOptions, waitForOptions)
//         expect(coordinates.textContent).toMatch(/\(3.*1\)$/)
//         expect(steps.textContent).toBe('You moved 2 times')
//       })
//     })
//   })

