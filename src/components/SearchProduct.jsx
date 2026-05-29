import React, { useContext, useEffect, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
import { Context } from '../context/ProductContext';



function SearchProduct({setLoading}) {
    const [categoryData, setCategoryData] = useState([])
    const {setCategoryId} = useContext(Context)

    const onChange = value => {
        setLoading(true)
        setTimeout(() => setCategoryId(value), 800);
    };

    useEffect(() => {
        async function gettingCategory() {
            const res = await axios.get('https://api.escuelajs.co/api/v1/categories')
            setCategoryData(res.data.map(item => {
                const data = {
                    value:item.id,
                    label:item.name
                }
                return data
            }))
        }
        gettingCategory()
    },[])

    console.log('search');
    
    
    return (
        <Select
            style={{width:300}}
            size='large'
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder="Select a person"
            onChange={onChange}
            options={categoryData}
        />
    )
}

export default React.memo(SearchProduct)
