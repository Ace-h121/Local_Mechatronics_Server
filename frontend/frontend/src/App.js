import React, {useEffect, useState} from 'react'

function App() {
  const [data, setData] = useState([{}])

  useEffect(()=>{
    fetch("http://localhost:5000/api").then(
      response => response.json()
    ).then(
      data => {
        setData(data);
      }
    )
  
    },[])
  return(
    <div>
    {(typeof data.users === 'undefined') ?(
      <p>loading...</p>
    ): (
      data.users.map((user, i) => (
        <p key={i}>{user}</p>
      ))
    )}
    </div>
  )
}
export default App