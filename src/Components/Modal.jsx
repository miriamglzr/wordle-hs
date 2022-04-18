import {  notification, Space } from 'antd';
import { useEffect } from 'react';



const openNotification = message => {
  notification.open({
    message: message,
    //description: message,
    placement:"top",
    duration: 2.2,
    top: 120,
   style: {width: "auto", justifyContent: "center"},
    closeIcon: <div style={{display: "none"}}/>
  });
};


export default function Modal({message}) {

  useEffect (
    () => {
      if (message) openNotification(message)
    },
    [message]
  );
  return (
    <>
    <Space>

    </Space>
  </>
  )
}

