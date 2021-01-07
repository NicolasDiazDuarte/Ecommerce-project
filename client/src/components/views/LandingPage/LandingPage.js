import React,{useState,useEffect} from 'react'
import Axios from "axios"
import { Card, Col, Icon, Row } from 'antd'
import ImageSlider from '../../utils/ImageSlider'

const {Meta} = Card

function LandingPage() {
    
    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(8)
    const [postSize, setPostSize] = useState(0)

    
    useEffect(() => {

        const variables = {
            skip : skip,
            limit : limit
        }
        getProducts(variables)
    }, [])

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
