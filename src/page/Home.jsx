import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ProductItem } from '../components'
import Input from 'antd/es/input/Input'
import { LoadingOutlined } from '@ant-design/icons'
import useDebounce from '../hook/useDebounce'
import { Empty } from 'antd'
import SearchProduct from '../components/SearchProduct'
import { Context } from '../context/ProductContext'

function Home() {
  const [product, setProduct] = useState([])
  const {categoryId} = useContext(Context)

  const [isLoading, setLoading] = useState(true)
  const handleSetLoading = useCallback((value) => setLoading(value), [])
  const [searchValue, setSearchValue] = useState('')

  const handleSreach = useCallback((e) => {
    setLoading(true)
    setSearchValue(e.target.value)
  },[])
  const searchWaitingValue = useDebounce(searchValue, 800)

  useEffect(() => {
    async function gettingProduct() {
      const res = await axios.get(`https://api.escuelajs.co/api/v1/products/?title=${searchWaitingValue}&offset=0&limit=10`, {
        params:{
          categoryId:categoryId
        }
      })

      setProduct(res.data);
      // console.log(res.data);
      setLoading(false)
    }
    gettingProduct()
  }, [searchWaitingValue, categoryId])

  console.log('home');
  

  return (
    <div className='p-10 '>
      <div className="flex justify-between">
        <div className="mb-5">
          <Input onChange={handleSreach} size='large' className='!w-[350px]' name='search' placeholder='Searching...' autoComplete='off' allowClear/>
        </div>
      
        <div className="w-[300px]">
          <SearchProduct setLoading={handleSetLoading} />
        </div>
      </div>
      <ul className='flex justify-between flex-wrap gap-5'>
        {isLoading ? <li className='mx-auto mt-10'> <LoadingOutlined  style={{fontSize:'60px', color:'blue'}} /> </li> : product.length > 0 ? product.map(item => <ProductItem key={item.id} item={item}/>) : <Empty className='scale-150 !mx-auto !mt-30' image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </ul>
    </div>
  )
}

export default Home
