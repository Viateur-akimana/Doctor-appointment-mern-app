import React from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  Layout  from "../component/Layout";

const Notification = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleMark = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("api.v1.user/get-all-notification");
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: true,
        message: "An error occurred when reading notification",
      });
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "api.v1.user/delete-all-notification",
        { _id: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      res.status(500).send({
        success: false,
        message: "An error occurred while deleting the notification",
      });
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
          {/* Map over user?.notification and return JSX */}
          {user?.notification.map((notification) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => Navigate(notification.onClickPath)}
              >
                {notification.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={0}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleDelete}
            >
              Delete All Read
            </h4>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;
