import { EllipsisOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import React from 'react'

const { Meta } = Card

function ProductItem({ item }) {
  console.log('items');
  
  return (
    <li className='shadow-md rounded-lg'>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            style={{height:'300px', objectFit:'contain', padding:'3px', paddingTop:'5px'}}
            draggable={false}
            alt={item.title}
            src={item.images?.[0]}
            onError={(e) => { e.target.src = 'https://placehold.co/300x200?text=No+Image'}}
          />
        }
        actions={[
          <ShoppingCartOutlined className='!scale-[1.5]' key={'ellipsis'} />,
          <HeartOutlined className='!scale-[1.5]' key={'ellipsis'} />,
          <EllipsisOutlined className='!scale-[1.5]' key={"ellipsis"} />,
        ]}
      >
        <Meta
          title={item.title}
          description={<p className='line-clamp-3'>{item.description}</p>}
        />
      </Card>
    </li>
  )
}

export default ProductItem