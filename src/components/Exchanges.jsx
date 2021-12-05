import { Avatar, Col, Collapse, Row, Typography } from 'antd'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify'
import React from 'react'
import { useGetExchangesQuery } from '../services/cryptoApi'
import Loader from './Loader/Loader'

const { Text } = Typography
const { Panel } = Collapse

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery()
    if (isFetching) return <Loader />
    const exchangesList = data?.data?.exchanges;

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            {exchangesList?.map(exchange => (
                <Row>
                    <Col span={24}>
                        <Collapse>
                            <Panel showArrow={false} key={exchange.id} header={
                                <Row key={exchange.id}>
                                    <Col span={6}>
                                        <Text strong={true}>{exchange.rank}.</Text>
                                        <Avatar className="exchange-image" alt={exchange.name} src={exchange.iconUrl} />
                                        <Text strong={true}>{exchange.name}</Text>
                                    </Col>
                                    <Col span={6}>${millify(exchange.volume)}</Col>
                                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                </Row>
                            } >
                                {HTMLReactParser(exchange.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
            ))}

        </>
    )
}

export default Exchanges
