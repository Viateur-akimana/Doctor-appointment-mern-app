import { Layout } from 'antd'
import React,{useState,UseEffect} from 'react'

const Doctors = () => {
    const getDoctors = async() =>{
        const [Doctors,setDoctors] = useState([])
        try {
            const res = await axios.get("api/v1/admin",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setDoctors(res.data.data)
            }
            
        } catch (error) {
           console.log(error);
           res.status(500).send({
             success:false,
             message:"Error in getting doctors"
           }) 
        }
    }
  return (
    <Layout>
        <h4>All doctors</h4>
    </Layout>
  )
}

export default Doctors