import axios from "axios"
import SummaryApi from "../common"
import { toast } from 'react-toastify'

const addToCart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()
    console.log(e, id)

    {console.log(SummaryApi?.addToCartProduct?.url)}
    const response = await fetch(SummaryApi?.addToCartProduct?.url,{
        method : SummaryApi?.addToCartProduct?.method,
        // credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })

    console.log(",,,,,,,,,,,",response)

    // const response = await axios({
    //     method: 'post',
    //     url: `http://localhost:8080/api/addtocart`,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     withCredentials: true,
    //     productId: id
    // });
    const responseData = await  response.json()
  console.log(responseData)

    if(responseData?.success){
        // toast.success("Item Added to Cart")
        toast.success(responseData?.message)
    }

    if(responseData.error){
        toast.error(responseData?.message)
    }


    return responseData

}


export default addToCart