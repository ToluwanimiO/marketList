import React, { useState } from 'react';
import {useParams,Link, useHistory} from 'react-router-dom';
import './styles.css'
function Edit(){
    const listItem = () =>{
        if(localStorage.getItem("marketList")!=null){
            let list = JSON.parse(localStorage.getItem("marketList"))
            let listItem = list.filter((item,index)=>(index==itemDetails))[0]
            return(listItem);
        }
        else{
            return("")
        }
    }
    const listStatus = ()=>{
        let marketItems =JSON.parse(localStorage.getItem("marketList"));
        let items= marketItems.filter((item,index)=>(index==itemDetails))[0]
        console.log(items.status)
        if(items.status=="pending"){
            return({empty:false,pending:true,bought:false})
        }
        else{
            return({empty:false,pending:false,bought:true})
        }
    }
    const {itemDetails} = useParams();
    let editDisplay;
    let [newList,setNewList]=useState(listItem());
    let [editStatus,setEditStatus]=useState("")
    let [itemStatus,setItemStatus]=useState(listStatus())
    let historyy = useHistory();
    const goBack=()=>{
        historyy.goBack()
    }
    if(localStorage.getItem("marketList")!=null){
        let list = JSON.parse(localStorage.getItem("marketList"))
        let listItem = list.filter((item,index)=>(index==itemDetails))[0]
        console.log(newList)
        if(newList==undefined){
            editDisplay=<p>Sorry no item matches the url</p>
        }
        else{
            const inputChange =(e)=>{
                
                if(e.target.name=="price"){
                    let totalQt=newList.quantity*e.target.value
                    setNewList({...newList,total:totalQt,[e.target.name]:e.target.value})
                  }
                  else if(e.target.name=="quantity"){
                    let totalQt=newList.price*e.target.value
                    setNewList({...newList,total:totalQt,[e.target.name]:e.target.value})
                  }
                  else{
                    setNewList({...newList,[e.target.name]:e.target.value})
                  }
            }
            const handleSubmit=(e)=>{
                e.preventDefault();
                console.log(list)
                let newStorage= list.map((item,index)=>index==itemDetails?newList:item)
                console.log(newStorage)
                localStorage.setItem("marketList",JSON.stringify(newStorage))
                setEditStatus("Item edited succesfully")
                setNewList({item:'',quantity:'',price:'',total:''})
                setItemStatus({empty:true,pending:false,bought:false})
            }
            editDisplay=<div className="mx-auto col-md-4 card" style={{marginTop:'10px',padding:'2em'}}>
            <p className=" text-center" style={{fontSize:'30px'}}><span onClick={goBack} className="fa fa-arrow-left" style={{fontSize:'20px',left:'2em', position:'absolute',color:'black',textDecorationLine:"none"}}></span>EDIT ITEM</p>
            <p className="mx-auto" style={{color:'green'}}>{editStatus}</p>
            <form onSubmit={handleSubmit} className="mx-auto">
                <table>
                <tr>
                    <td>Item:</td>
                    <td><input type="text" id="item" className="form-control m-2" style={{display:'inline'}} placeholder="Item" name="item" value={newList.item} onChange={inputChange}/></td>
                </tr>
                <tr>
                    <td>Quantity:</td>
                    <td><input type="text" className="form-control m-2" style={{display:'inline'}} placeholder="Quantity" name="quantity" value={newList.quantity} onChange={inputChange}/></td>
                </tr>
                <tr>
                    <td>Price:</td>
                    <td><input type="text" className="form-control m-2" style={{display:'inline'}} placeholder="Expected Price" name="price" value={newList.price} onChange={inputChange}/></td>
                </tr>
                <tr>
                    <td>Total:</td>
                    <td><input type="text" className="form-control m-2" style={{display:'inline'}} placeholder="Total Quantity" name="total" value={newList.total} readOnly/></td>
                </tr>
                <tr>
                    <td>
                        Status:
                    </td>
                    <td>
                        <select name="status" className="form-control m-2" onChange={inputChange}>
                            <option value="pending" selected={itemStatus.empty} disabled></option>
                            <option value="pending"selected={itemStatus.pending}>Pending</option>
                            <option value="bought" selected={itemStatus.bought}>Bought</option>
                        </select>
                    </td>
                </tr>
                </table>
                <button className="btn btn-info ml-auto d-block mt-2 mb-2" type="submit">Save</button>
            </form><br />
            <Link to="/" className="btn btn-secondary mr-3" style={{width:'100%'}}>Back to Home</Link>
            </div>
        }
    }
    else{
        editDisplay=<p>You have no items to edit</p>
    }
    return(
        <>
            {editDisplay}
        </>
    )
}
export default Edit;