import { Layout } from 'antd'
import React, { useEffect } from 'react'

const Users = () => {
    const [Users,setUsers] = useState([]);
const getUsers = () =>{
    try {
        const res = await axios.get("api/v1/admin/getAllUsers",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.data.success){
            setUsers(res.data.data)
        }

    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"User are not found"
        })
    }
}
useEffect(() => {
getUsers()
}, [])

  return (
    <Layout>
        <h6>All user lists</h6>
    </Layout>
  )
}

export default Users