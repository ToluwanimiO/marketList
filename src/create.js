import React from 'react';
import {Link} from 'react-router-dom';
function Create(props){
    let {marketList, saveList,submitList,total,submitStatus} = props;
    return(
        <>
            <div className="mx-auto col-4 text-center card" style={{marginTop:'40px',padding:'2em',paddingRight:'3em'}}>
            <p style={{fontSize:'30px'}}>MARKET ITEM</p>
            <p>{submitStatus}</p>
            <form onSubmit={submitList}>
                <input type="text" className="form-control m-3" placeholder="Item" name="item" value={marketList.item} onChange={saveList}/>
                <input type="text" className="form-control m-3" placeholder="Quantity" name="quantity" value={marketList.quantity} onChange={saveList}/>
                <input type="text" className="form-control m-3" placeholder="Expected Price" name="price" value={marketList.price} onChange={saveList}/>
                <input type="text" className="form-control m-3" placeholder="Total Price" name="total" value={total} readOnly/>
                <input type="text" className="form-control m-3" placeholder="Budget" name="budget" hidden/>
                <button className="btn btn-info ml-auto d-block" type="submit"> Save</button>
            </form><br />
            <Link to="/" className="btn btn-secondary m-3" style={{width:'100%'}}>Back to Home</Link>
            </div>
        </>
    )
}
export default Create;