import React,{useState} from 'react'
import {Input} from 'antd'

const {Search} = Input

function SearchFeature(props) {
    const [searchTerms, setSerchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSerchTerms(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)
    }
    
    return (
        <div>
            <Search 
                value={searchTerms}
                onChange={onChangeSearch}
                placeholder = "Buscar..."
            />
        </div>
    )
}

export default SearchFeature
