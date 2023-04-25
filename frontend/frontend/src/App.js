import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [object, setObject] = useState([{}]);

  const [owlbotInput, setOwlbotInput] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((object) => {
        setObject(object);
      });
  }, []);

  const handleChange = (event) => {
    let newValue = event.target.value;
    setOwlbotInput(newValue);
  };

  function owlBotSubmit() {
    let newPosition = {
      owlbot: owlbotInput,
    };
    fetch("http://localhost:5000/postRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPosition),
    }).then(console.log(newPosition));
  }

  return (
    <body>
      <h1 id="heading">CONTROL THE OWLBOT!</h1>
      <input onChange={handleChange} />
      <br />
      <button onClick={() => owlBotSubmit()}>SUBMIT</button>
    </body>
  );
}
export default App;
