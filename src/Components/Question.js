import { React, useState, useEffect } from "react"
import axios from "axios"

const Question = () => {

    const [data, setData] = useState([])
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [options1, setOptions1] = useState('')
    const [options2, setOptions2] = useState('')
    const [options3, setOptions3] = useState('')
    const [options4, setOptions4] = useState('')
    const [category, setCategory] = useState('')
    const [id, setID] = useState("")

    function handleQuestion(e) {
        setQuestion(e.target.value)
    }
    function handleAnswer(e) {
        setAnswer(e.target.value)
    }
    function handleOptions1(e) {
        setOptions1(e.target.value)
    }
    function handleOptions2(e) {
        setOptions2(e.target.value)
    }
    function handleOptions3(e) {
        setOptions3(e.target.value)
    } 
    function handleOptions4(e) {
        setOptions4(e.target.value)
    }
    function handleDrop(e) {
        setCategory(e.target.value)
    }
    const [cate, setCate] = useState([])
    let token = localStorage.getItem("token")

    useEffect(() => {
        getData()
        axios.get('http://localhost:3000/category/allCategory', { headers: { token: token } })
            .then(function (response) {
                let copyArray = []
                for (let i = 0; i < response.data.data.length; i++) {
                    copyArray.push(response.data.data[i])
                }
                setCate(copyArray);
                setCategory(copyArray[0]._id)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const getData = () => {
        let token = localStorage.getItem("token")
        axios.get('http://localhost:3000/quiz/allQuiz', { headers: { token: token } })
            .then(function (response) {
                setData(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const handleDelete = (index, id) => {
        let token = localStorage.getItem("token")

        axios.delete("http://localhost:3000/quiz/delete?id=" + id, { headers: { token: token } })
            .then(function (response) {
                getData()
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleEdit = (index, id) => {
        let copyArray  = [...data]
        setQuestion(copyArray[index].question)
        setAnswer(copyArray[index].answer)
        setOptions1(copyArray[index].options[0])
        setOptions2(copyArray[index].options[1])
        setOptions3(copyArray[index].options[2])
        setOptions4(copyArray[index].options[3])
        setCategory(copyArray[index].category._id)
        setID(id)

    };
    const handleSubmit = () => {

        let OBJ = {
            question: question,
            answer: answer,
            options: [ options1, options2, options3, options4 ],
            category: category
        }
        if (id) {
            try {
                axios.post("http://localhost:3000/quiz/update?id="+id, OBJ, { headers: { token: token } })
                    .then(function (response) {
                        console.log(response);
                        getData()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err);
            }
        }else{
            try {
                axios.post("http://localhost:3000/quiz/create", OBJ, { headers: { token: token } })
                    .then(function (response) {
                        getData()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                } 
            catch (err) {
                console.log(err);
            }
        }
        setQuestion("")
        setAnswer("")
        setOptions1("")
        setOptions2("")
        setOptions3("")
        setOptions4("")
        setCategory("")
        setID("")
    }
    return (
        <>
            <div className="mainBox">
                <table border={1} cellPadding={10}>
                    <tr className="question-group">
                        <td>
                            <label for='question'>Question</label>
                        </td>
                        <td>
                            <input type="text" value={question} onChange={handleQuestion} required></input>
                        </td>
                    </tr>
                    <tr className="question-group">
                        <td>
                            <label for='answer'>Answer</label>
                        </td>
                        <td>
                            <input type="text" value={answer} onChange={handleAnswer} required></input>
                        </td>
                    </tr>
                    <tr className="question-group">
                        <td>
                            <label for='options'>Options</label>

                        </td>
                        <td className="options">
                            <input type="text" value={options1} onChange={handleOptions1} required></input><br></br>
                            <input type="text" value={options2} onChange={handleOptions2} required></input><br></br>
                            <input type="text" value={options3} onChange={handleOptions3} required></input><br></br>
                            <input type="text" value={options4} onChange={handleOptions4} required></input>
                        </td>
                    </tr>
                    <tr className="question-group">
                        <td>
                            <label for='category'>Category</label>
                        </td>
                        <td>
                            <select onChange={handleDrop}>
                                {
                                    cate.map((el) => {
                                        return (
                                            <>
                                                <option selected={el._id === category} value={el._id}>{el.category}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </td>
                    </tr>
                    <tr className="question-group">
                        <td colSpan={2}>
                            <button type="submit" onClick={handleSubmit}>Submit</button>
                        </td>
                    </tr>
                </table>
            </div>
            <div className="mainBox">
                <table border={1} cellPadding={10}>
                    <thead>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Options</th>
                        <th>Category</th>
                    </thead>
                    <tbody>
                        {
                            data.map((el, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{el.question}</td>
                                            <td>{el.answer}</td>
                                            <td>{el.options.join(', ')}</td>
                                            <td>{el.category.category}</td>
                                            <td>
                                        <button onClick={() => handleEdit(index, el._id)}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(index, el._id)}>Delete</button>
                                    </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Question
