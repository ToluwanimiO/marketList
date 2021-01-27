import React from 'react';
import {useParams,Link} from 'react-router-dom';
import './styles.css';
function Details (){
    const {itemDetails} = useParams();
    let detailedView;
    if(localStorage.getItem("marketList")!=null){
        let list = JSON.parse(localStorage.getItem("marketList"))
        let newList = list.filter((item,index)=>(index==itemDetails))[0]
        console.log(newList)
        if(newList==undefined){
            detailedView = <p>Sorry this item does not exist</p>
        }
        else{
        let id = itemDetails
        detailedView= <div className="mx-auto col-4 card" style={{marginTop:'70px',padding:'2em'}}>
            <p className=" text-center" style={{fontSize:'30px'}}>
                <Link to="/view" className="fa fa-arrow-left" style={{fontSize:'20px',left:'2em', position:'absolute',color:'black',textDecorationLine:"none"}}></Link>ITEM</p>
            <table className="mx-auto">
                <tr>
                    <td className="padTd">Item:</td>
                    <td className="padTd">{newList.item}</td>
                </tr>
                <tr>
                    <td className="padTd">Price:</td>
                    <td className="padTd">{newList.price}</td>
                </tr>
                <tr>
                    <td className="padTd">Quantity:</td>
                    <td className="padTd">{newList.quantity}</td>
                </tr>
                <tr>
                    <td className="padTd">Total:</td>
                    <td className="padTd">{newList.total}</td>
                </tr>
                <tr>
                    <td className="padTd">Status:</td>
                    <td className="padTd">{newList.status}</td>
                </tr>
                <tr>
                    <td className="padTd">Date created:</td>
                    <td className="padTd">{newList.date}</td>
                </tr>
            </table>
         <Link to={`/edit/${id}`} className="btn btn-info" style={{right:'2em',position:'absolute'}}>Edit</Link>
        <br />
        <Link to="/" className="btn btn-secondary m-3" style={{width:'100%'}}>Back to Home</Link>
        </div>
        }
    }
    else{
        detailedView=<p>You have no items to display</p>
    }
    

    return(
        <>
            {detailedView}
        </>
    )
}
export default Details;