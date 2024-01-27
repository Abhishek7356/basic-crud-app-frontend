import React, { useEffect, useState } from 'react'
import './Item.css'
import { useParams } from 'react-router-dom'
import { getItemById } from '../../services/allApi'
import Loading from '../../components/Loading/Loading'

const Item = () => {

    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true);
    const { id } = useParams()
    const fetchData = async () => {
        const res = await getItemById(id);
        setItem(res.data)
        setLoading(false)
    }
    console.log(item)

    useEffect(() => {
        fetchData()
    }, [id])

    return (
        <div className='d-flex flex-column gap-1 align-items-center justify-content-center' style={{ flex: '1' }}>
            {loading ? <Loading /> : <div className='shadow-sm p-5'>
                <h2 className='fw-bold mb-3'>{item.name}</h2>
                <h5 className='fw-bold'>{item.description}</h5>
                <p className='text-end mt-3'>{item._id}</p>
                <p className='text-end'>Created : {new Date(item.createdAt).toDateString()}</p>
            </div>}
        </div>
    )
}

export default Item