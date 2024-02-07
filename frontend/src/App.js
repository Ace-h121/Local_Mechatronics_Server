import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import "./App.css";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBpVcO6H0G1eSjqtdIT4NnJ-_8reZEZf6w",
    authDomain: "arduino-i-o.firebaseapp.com",
    databaseURL: "https://arduino-i-o-default-rtdb.firebaseio.com",
    projectId: "arduino-i-o",
    storageBucket: "arduino-i-o.appspot.com",
    messagingSenderId: "670585000029",
    appId: "1:670585000029:web:6e1c320b2ca6ba58b6bdb4",
    measurementId: "G-DT4F60MNPQ",
  };

  const app = initializeApp(firebaseConfig);

  const database = getDatabase();

  const refrence = ref(database, "owlbot");

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
    set(refrence, newPosition);


    //old code used when it was only a local connection
    /*
    fetch("http://localhost:5000/postRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPosition),
    }).then(console.log(newPosition));
    */
  }

  return (
    <body>
      <h1 id="heading">CONTROL THE OWLBOT!</h1>
      <input onChange={handleChange}  type='number'/>
      <br />
      <button onClick={() => owlBotSubmit()}>SUBMIT</button>
    </body>
  );
}
export default App;
