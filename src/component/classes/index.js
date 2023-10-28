
import axios from "axios";
import React, { useState, useEffect } from "react";
import ClassOne from "../oneClass";
const Classes = () => {
  const [name, setName] = useState("");
  const [classes, setClasses] = useState([]);
  const [data, setdata] = useState([]);

  const handleChange = (e) => {
    setName(e.target.value);
    //   event.preventDefault()
  };

  const createStudent = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/classes`, {
        name,
        id: Math.random() * 9999,
      });
      setClasses([...classes, response.data]);
      console.log(response.data);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };


  const fetchData =async()=>{
    const response =await axios.get(`https://localhost:3001/classes`)
    setdata([response.data])
  }

 
  useEffect(()=>{
    fetchData()
  },[])







  const handleClickName=(student)=>{
    return <ClassOne name={student.name}/>
  }

  return (
    <div>
      <input onChange={handleChange} />
      <button onClick={createStudent}>enter</button>
      {classes?.map((student, index) => (
        <div onClick={()=>{handleClickName(student)}} key={index}>{student.name}</div>
      ))}
      {data.map((data,i)=>{
        return(
            <div>{data}</div>
        )
      })}
    </div>
  );
};

export default Classes;

