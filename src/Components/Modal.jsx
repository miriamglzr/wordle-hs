import { Button, notification, Space } from 'antd';
import {
  BorderTopOutlined,
} from '@ant-design/icons';
import { useEffect } from 'react';



const openNotification = message => {
  notification.open({
    message: message,
    //description: message,
    placement:"top",
    duration: 1.5,
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

