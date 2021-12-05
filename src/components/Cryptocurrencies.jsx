import { Card, Col, Input, Row } from 'antd'
import millify from 'millify'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader/Loader'

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [cryptosList, searchTerm])

    if (isFetching) return <Loader />

    return (
        <>
            {!simplified &&
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
                </div>}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((item) =>
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={item.id}>
                        <Link to={`/crypto/${item.id}`}>
                            <Card hoverable title={`${item.rank}. ${item.name}. ${item.symbol}`} extra={<img className='crypto-image' alt='crypto' src={item.iconUrl} />}>
                                <p>Price: {millify(item.price)}</p>
                                <p>Market Cap: {millify(item.marketCap)}</p>
                                <p>Daily Change: {millify(item.change)}</p>
                            </Card>
                        </Link>
                    </Col>)
                }
            </Row>
        </>
    )
}

export default Cryptocurrencies
