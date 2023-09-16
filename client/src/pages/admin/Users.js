import { Layout } from 'antd'
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Table, message}from 'antd';

const Users = () => {
    const [users,setUsers] = useState([]);
    //getting users
const getUsers = async() =>{
    try {
        const res = await axios.get("api/v1/admin/getAllUsers",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });
        if(res.data.success){
            setUsers(res.data.data)
        }

    
    } catch (error) {
        console.log(error);
        message.error("User are not found");
    }
}
useEffect(() => {
getUsers()
}, [])
//antd collumns
const columns  = [
    {
        title:"Name",
        dataIndex:"name"
    },
    {
    title:"Email",
    dataIndex:"email"
    },
    {
        title:"Doctor",
        dataIndex:"isDoctor",
        render:(text,record)=>{
      <span>{record.isDoctor? "YES":"NO"}</span>
        },
         
        title:"action",
        dataIndex:"action",
        render:(text,record)=>{
            <div className="d-flex">
                <button className='btn btn-danger'>Block</button>
            </div>
        }
    }
]

  return (
    <Layout>
        <h6 className='text-center m-3'>All user lists</h6>
        <Table columns={columns} dataSource={users}>

        </Table>
    </Layout>
  )
}

export default Users