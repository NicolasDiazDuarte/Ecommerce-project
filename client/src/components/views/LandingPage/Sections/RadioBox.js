import React from 'react'
import {Collapse,Radio} from 'antd';
import { useState } from 'react';
import {price} from './Datas'

const {Panel} = Collapse



function RadioBox(props) {

    const [value, setValue] = useState('0')
    
    const renderRadioBox = () => (
        props.list && props.list.map( (value) => (
            <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
        ))
    )
    const handleChange = ()=> {
        // eslint-disable-next-line no-restricted-globals
        setValue(event.target.value)
        // eslint-disable-next-line no-restricted-globals
        props.handleFilters(event.target.value)
    }
    return (
        <div>
            <Collapse defaultActiveKey={[0]}>
                <Panel header="Filtrar por precio" key="1">
                    <Radio.Group onChange={handleChange} value={value}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
