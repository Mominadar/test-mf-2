import React from "react"
import ReactDOM from "react-dom"
import Button from 'library/Button'

const App = () => (
  <Button
    onClick={() => alert("Now everything's alright! If not, check reality settings.")}
  >
   yooooooooo
  </Button>
)

ReactDOM.render(<App />, document.getElementById("app"))
