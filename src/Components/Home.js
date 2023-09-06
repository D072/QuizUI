import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const Home = () => {
    const history = useHistory()
    const [data, setData] = useState([])

    useEffect(() => {
        getData()   
    }, [])
    
    const getData = async () => {
        let token = localStorage.getItem("token")

        await axios.get('http://localhost:3000/category/allCategory', { headers: { token: token } })
            .then(function (response) {
                setData(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const handleClick = async (id) => { 
        return history.push('/quiz/'+id)
    }
    return (
        <>
            <div className="mainBox">
                <table border={1} cellPadding={10}>
                    <tr>
                        <th colSpan={4}>
                            <label for='category'>CATEGORY</label>
                        </th>
                    </tr>
                    {
                        data.map((el, index) => {
                            return (
                                <>
                                    <tr>
                                        <td colSpan={2}>{el.category}</td>
                                        <td>
                                            <button onClick={() => handleClick(el._id)}>Choose</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}

export default Home
