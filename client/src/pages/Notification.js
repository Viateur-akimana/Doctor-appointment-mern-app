import { Layout } from "../component/Layout";
import React from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {showLoading,hideLoading} from "../redux/features/userSlice"
import axios from "axios";

const Notification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleMark = async() => {
try {
    dispatch(showLoading());
    const res = await axios.post("api.v1.user/get-all-notification",);
    dispatch(hideLoading());
if(res.data.success){
    message.success(res.data.message);
}
else{
    message.error(res.data.message)
}
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:true,
        message:"An error when reading notification"
    })
}
  };
  const handleDelete = async() => {
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"An error occured while deleting the notification"
        })
    }
  };
  return (
    <Layout>
      <h6 className="pt-3 text-center">Notification page</h6>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="" onClick={handleMark}>
              Mark All Read
            </h4>
          </div>
        </Tabs.TabPane>
        user?.notification.map((notification) => (
        <div className="card" onClick={notification.onClickPath}>
          <div className="card-text">{notification.message}</div>
        </div>
        ))
        <Tabs.TabPane tab="Read" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="" onClick={handleDelete}>
              Delete All Read
            </h4>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;
