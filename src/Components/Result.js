import React, { useEffect, useState } from 'react'

const Result = () => {
    const [resData, setResData] = useState([]) 

    useEffect(() => {
        let getResData =  localStorage.getItem('result')
        let parsegetResData = JSON.parse(getResData) 
        setResData(parsegetResData)
        // for (let index = 0; index < parsegetResData.length ; index++) {
    
        //     resData.push(parsegetResData[index])        
        // }
    }, [])

  

    console.log(resData);
  return (
    <>
        <div className='mainBox'>
            <table cellPadding={10} border={1}>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Right Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        resData.map((el,index) =>{
                            return(
                                <tr className={el.action == true ? 'bg-color-red' : 'bg-color-green'}>
                                    <td>{el.question}</td>
                                    <td>{el.answer}</td>
                                    <td>{el.answer}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Result
