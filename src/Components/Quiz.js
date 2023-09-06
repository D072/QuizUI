import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom"


const Quiz = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const [index, setIndex] = useState(-1)
  const [count, setCount] = useState(0)
  const [ansData, setAnsData] = useState([])
  const [result , setResult] = useState([])
  const history = useHistory()


  const getData = async () => {
    axios.get('http://localhost:3000/quiz/searchData?id=' + params.id)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const handelOption = (inx) => {
    setIndex(inx)
  }
  const handleCountPlus = () => {
    if (count < data.length - 1 && index > -1) {
      let ans = {
        questionNo: count,
        question: data[count].question,
        answer: data[count].options[index]
      }
      let copyArray = [...ansData]
      
      let findQUE = ansData.find((el) => el.questionNo == count)

      if (findQUE) {
        copyArray.splice(count, 1, ans)
      } else {
        copyArray.push(ans)
      } 

      setAnsData(copyArray)
      setCount(count + 1);
      setIndex(-1)

      let checkIsALready = ansData.find((el) => el.questionNo == (count + 1))

      if (ansData && ansData.length && checkIsALready) {
        let ansr = checkIsALready.answer
        let findOPT = data[checkIsALready.questionNo].options.findIndex((el) => el === ansr)  
        setIndex(findOPT) 
      }
    }
    else {
      alert("choose valid option")
    }
  }
  const handleCountMinus = () => {
    if (count > 0) {
      let curruntCount = count - 1
      let ansr = ansData[curruntCount].answer
      let findOPT = data[curruntCount].options.findIndex((el) => el === ansr)  
      setCount(curruntCount);
      setIndex(findOPT)
    }
    else {
      setCount(0)
    }
  }
  const handleCountSubmit = () => {
    let copyArray = [...ansData]

    if (count === data.length - 1 && index > -1) {
      let ans = {
        questionNo: count,
        question: data[count].question,
        answer: data[count].options[index]
      }
      let findQUE = ansData.find((el) => el.questionNo == count)
      if (findQUE) {
        copyArray.splice(count, 1, ans)
      } else {
        copyArray.push(ans)
      } 
      setAnsData(copyArray)
    }
    else {
      alert("choose valid option")
    }
    let resData = []
    for (let index = 0; index < data.length; index++) {
      if (data[index].answer == copyArray[index].answer) {
        resData = {
         question : copyArray[index].question,
         answer : copyArray[index].answer,
         action :true
        } 
      } else {
        resData = {
          question : copyArray[index].question,
          answer : copyArray[index].answer,
          action :false
         }
      }
      result.push(resData)
      localStorage.setItem("result", JSON.stringify(result))
    }
   let getResData =  localStorage.getItem("result")
   let parsegetResData = JSON.parse(getResData)
   console.log(parsegetResData);
   history.push("/resultData")
  }
  return (
    <>
      <div className='mainBox'>
        <div className='box-center'>
          {
            data && data.length ? <>
              <h1>{data[count].question}</h1>
              <button className={index === 0 ? 'active' : "button"} onClick={() => handelOption(0)}>A. {data[count].options[0]}</button> <br></br>
              <button className={index === 1 ? 'active' : "button"} onClick={() => handelOption(1)}>B. {data[count].options[1]}</button> <br></br>
              <button className={index === 2 ? 'active' : "button"} onClick={() => handelOption(2)}>C. {data[count].options[2]}</button> <br></br>
              <button className={index === 3 ? 'active' : "button"} onClick={() => handelOption(3)}>D. {data[count].options[3]}</button> <br></br>
            </> : ""
          }
          <br></br>
          {
            count === data.length - 1 ? <button onClick={handleCountSubmit} className='button'>Submit</button> : <button onClick={handleCountPlus} className='button'>Next</button>
          }

          <button onClick={handleCountMinus} className='button'>Prev</button>
        </div>
      </div>
    </>
  )
}

export default Quiz
