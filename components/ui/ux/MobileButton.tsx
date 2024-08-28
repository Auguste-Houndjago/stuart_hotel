"use client"

import React from 'react';
import { PlusCircleOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useRouter } from 'next/navigation';


const MobileButton: React.FC = () => {

    const router =useRouter();

    return(
  <>

    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ insetInlineEnd: 24 }}
      icon={<PlusCircleOutlined />}
     
    >
      <FloatButton tooltip={<div>new hotel</div>} icon={<PlusCircleOutlined />}  onClick={ ()=>router.push('/hotel/new')} />
      
       
      {/* <FloatButton icon={<CommentOutlined />} /> */}
    </FloatButton.Group>

  </>)


};

export default MobileButton;