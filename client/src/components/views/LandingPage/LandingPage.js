import React,{useState,useEffect} from 'react'
import Axios from "axios"
import { Card, Col, Icon, Row } from 'antd'
import ImageSlider from '../../utils/ImageSlider'
import RadioBox from './Sections/RadioBox'
import {price} from './Sections/Datas'

const {Meta} = Card

function LandingPage() {
    
    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(8)
    const [postSize, setPostSize] = useState(0)

    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    
    useEffect(() => {

        const variables = {
            skip : skip,
            limit : limit
        }
        getProducts(variables)
    }, [])

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: limit,
            filters: filters

        }
        getProducts(variables)
        setSkip(0)

    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues

        }

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const getProducts = (variables)=> {
        Axios.post('/api/product/getProducts',variables)
        .then(response =>{
            if (response.data.success){
                
                setProducts([...products,...response.data.products])
                
                setPostSize(response.data.postSize)
                
                console.log(response.data.products)
            } else{
                alert('Failed to fetch products ')
            
            }
        })
        
    }

    const renderCards =products.map((product,index)=>{
        return <Col lg={6} md={8} xs={24}>
            <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
                <Meta title={product.title} description={`$${product.price}`} />
            </Card>
        </Col>
    })

    const loadMore = () => {
        let skips = skip + limit
        const variables = {
            skip : skips,
            limit : limit
        }
        getProducts(variables)
        setSkip(skips)

    }
    return (
        <div style={{width:'75%', margin:'3rem auto'}}>
            <div style={{textAlign:'center'}}>
                <h2>Venta de Productos  <Icon type="rocket"/> </h2>
            </div>

            <RadioBox handleFilters={filters=> handleFilters(filters,"price")} />

            {products.length===0 ? 
                <div style={{display:'flex',height:'300px',justifyContent:'center',alignItems:'center'}}> 
                    <h2>No post yet...</h2>
                </div> :
                <div> 
                    <Row gutter={[16,16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br/>
                {postSize >= limit &&
                <div style={{display:'flex',justifyContent:'center'}}>
                    <button onClick={loadMore}> Cargar Mas </button>
                </div>
                }
                
        </div>


    )
}

export default LandingPage
