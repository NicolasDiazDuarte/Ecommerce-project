import React,{useState} from 'react'
import {Typography,Button,Form,message,Input,Icon} from 'antd' 
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios'

const {Title} = Typography
const {TextArea} = Input

const UploadProductPage = (props) => {
    
    const [titleValue, setTitleValue] = useState("")
    const [descriptionValue, setDescriptionValue] = useState("")
    const [priceValue, setPriceValue] = useState()
    const [images, setImages] = useState([])

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }
    
    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const updateImages= (newImages) => {
        console.log(newImages)
        setImages(newImages)
        
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!titleValue || !descriptionValue || !priceValue || !images) {
            return alert ('Fill all the fields first')
        }

        const variables = {
            writer: props.user.userData._id,
            title: titleValue,
            description: descriptionValue,
            price: priceValue,
            images: images,
        }
        Axios.post('/api/product/uploadProduct',variables)
            .then(response => { 
                if (response.data.success){
                    alert('Product Succesfully uploaded')
                    props.history.push('/')
                }else {
                alert ('failed to upload Product')
                props.history.push('/')
                }

        })
    }
    return (
        <div style = {{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'3rem' }}>

            </div>
                <Title level={2}> Subir un Nuevo producto </Title>
            <Form onSubmit={onSubmit}> 

                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                
                <label>Title</label>
                
                    <Input onChange={onTitleChange} value={titleValue}> 

                    </Input>
                
                <br />
                <br />

                <label>Description</label>
                    <TextArea onChange={onDescriptionChange} value={descriptionValue}

                    />

                <br />
                <br />

                <label>Price</label>    
                    <Input onChange={onPriceChange} value={priceValue} type = "number" >

                    </Input>

                <br />
                <br />

                <Button onClick= {onSubmit}>
                    Submit
                </Button>



            </Form>
        </div>
    )
}

export default UploadProductPage
