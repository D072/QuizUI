import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Category = () => {


    const [data, setData] = useState([])
    const [value, setValue] = useState()
    const [id, setID] = useState("")



    const getData = async () => {
        let token = localStorage.getItem("token")

        await axios.get('http://localhost:3000/category/allCategory',{ headers: { token: token } })
            .then(function (response) {
                setData(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    useEffect(() => {
        getData()
    }, []);

    const handleEdit = (index, id) => {
        let copyArray = [...data];
        setValue(copyArray[index].category);
        setID(id)
    };
    const handleDelete = (index, id) => {
        let copyArray = [...data];
        copyArray.splice(index, 1);
        setData(copyArray);
        let token = localStorage.getItem("token")

        axios.delete("http://localhost:3000/category/delete?id=" + id, { headers: { token: token } })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = async () => {
        let OBJ = {
            category: value
        }
        let token = localStorage.getItem("token")
        if (id) {
            try {
                axios.post("http://localhost:3000/category/update?id="+id, OBJ, { headers: { token: token } })
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
        }
        else {
            try {
                axios.post("http://localhost:3000/category/create", OBJ, { headers: { token: token } })
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
        setValue("")
        setID("")
    }
    return (
        <div className='category'>
            <table border={1} cellPadding={10}>
                <tr>
                    <th colSpan={4}>
                        <label for='category'>CATEGORY</label>
                    </th>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <input type='text' className='w-100' onChange={(e) => setValue(e.target.value)} value={value}></input>
                    </td>
                    <td>
                        <button onClick={handleSubmit}>Submit</button>
                    </td>
                </tr>
                {
                    data.map((el, index) => {
                        return (
                            <>
                                <tr>
                                    <td colSpan={2}>{el.category}</td>
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
            </table>
        </div>
    )
}

export default Category
