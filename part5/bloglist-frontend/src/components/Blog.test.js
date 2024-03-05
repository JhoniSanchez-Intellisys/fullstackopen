import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Blog from "./Blog"
import Formblog from "./Formblog"

//con este buscamos selectores de css en la renderizacion.
test("muestre tituto, pero no  author ni url", () => {
  const blog = {
    title: "Juan",
    author: "Perez",
    url: "www"
  }

  const { container } = render(<Blog blog={blog} />)

  //imprime en consola el elemento html del componente
  // screen.debug()

  const div = container.querySelector(".blog")
  expect(div).toHaveTextContent(
    "Juan"
  )
  expect(div).not.toHaveTextContent(
    "Perez"
  )
  expect(div).not.toHaveTextContent(
    "www"
  )
})

test("Muestra likes y author, cuando se da click", async () => {

  const blog = {
    title: "Juan",
    author: "Perez",
    url: "www",
    like: "01"
  }
  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector(".blog")
  const user = userEvent.setup()
  const button = screen.getByText("Mostrar")

  await user.click(button)
  mockHandler()

  expect(div).toHaveTextContent("Perez")
  expect(div).toHaveTextContent("www")
  expect(mockHandler.mock.calls).toHaveLength(1)
  //   expect(element).toBeDefined()
})



test("Si se hace clic dos veces en el botón delete , se llame dos veces al controlador de eventos ", async () => {

  const blog = {
    title: "Juan",
    author: "Perez",
    url: "www",
    like: 1
  }
  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} dele = {mockHandler} />)
  const div = container.querySelector(".blog")
  const user = userEvent.setup()
  const button = screen.getByText("Mostrar")
  await user.click(button)
  mockHandler()
  const buttonLike = screen.getByText("Delete")
  await user.click(buttonLike)
  mockHandler()
  await user.click(buttonLike)
  mockHandler()

  expect(mockHandler.mock.calls).toHaveLength(5)
  //   expect(element).toBeDefined()
})



//con neste buscamos texto en la renderizacion.
test("renders content", () => {
  const blog = {
    title: "tregbtrdb",
    author: "trsbtrsbrgtf",
    url: "sbtrgsbrsbrtg"
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText("tregbtrdb")
  //   expect(element).toBeDefined()
})



test("clicking the button calls event handler once", async () => {

  const blog = {
    title: "tregbtrdb",
    author: "trsbtrsbrgtf",
    url: "sbtrgsbrsbrtg"
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} dele={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText("Delete")
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  //   expect(element).toBeDefined()
})

// test("<Fromblog /> updates parent state and calls onSubmit", async () => {
//   const funct = jest.fn()
//   const user = userEvent.setup()

//   const { container } = render(<Formblog addnewblog={funct} />)

//   // const input = screen.getByRole("textbox") //si solo hay un campo de texto en el comp
//   // const input = screen.getAllByRole("textbox")
//   // const input = screen.getByPlaceholderText("title")
//   const input = container.querySelector("#blog-input")

//   const sendButton = screen.getByText("save")


//   await user.type(input, "e")
//   await user.click(sendButton)

//   expect(funct.mock.calls).toHaveLength(1)
//   // expect(funct.mock.calls[0][0].content).toBe("e")
// })