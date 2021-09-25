import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
function View(){
    const displayStorage = () =>{
        if(localStorage.getItem("marketList")!=null){
            let list = JSON.parse(localStorage.getItem("marketList"))
            return(list);
        }
        else{
            return("")
        }
    }
    let [dateList, setDateList]=useState([]);
    let [newDates,setNewDates]=useState([])
    let mappedView;
    let countPend=0;
    let countBought=0;
    let [storedItems,setStoredItems]=useState(displayStorage());
    useEffect(()=>{
        let datee = dateList.map(element=>{
            let filteredItems = storedItems.filter(item=>item.date==element)
            return([element,filteredItems])
        })
        setNewDates(datee)
    },[storedItems])
    console.log(newDates)
    
    const deleteItem =(itemIndex)=>{
        let newDeleted = storedItems.filter((item,index)=>index!==itemIndex)
        setStoredItems(newDeleted)
        localStorage.setItem("marketList",JSON.stringify(newDeleted))
     }
    if(localStorage.getItem("marketList")!=null){
        // let storage = JSON.parse(localStorage.getItem("marketList"))
        storedItems.forEach(element => {
            // console.log(element.date)
            if(dateList.includes(element.date)){
                // console.log('exists')
            }
            else{
                setDateList([...dateList,element.date])
                // setNewDates([...newDates,{date:element.date,bought:"",pend:""}])
            }
        });
        mappedView = dateList.map((date,indexDate)=>(
            <div key={indexDate} className="mx-auto col-md-8 card text-center mt-1 bg-light">
                <p className="mt-2 row" style={{fontSize:'20px',textAlign:'left'}} role="button" data-target={`#items${indexDate}`} data-toggle="collapse" aria-expanded="false">
                    <b style={{marginLeft:'2em'}}>{date}</b><i className="fa fa-angle-down" style={{position:'absolute',right:'30px',marginTop:'1em'}}></i>
                        {newDates.map(item=>item[0]==date?
                            <><div className="col-4"></div>
                            <div className="col-md-2 size15">Bought: {(item[1].filter(itemI=>itemI.status=="bought").length)}</div>
                            <div className="col-md-2 size15">Pending: {(item[1].filter(itemI=>itemI.status=="pending").length)}</div>
                            <div className="col-1"></div>
                            </>:<p></p>)}
                        {/* <font style={{fontSize:'15px',marginTop:'1em',textAlign:'right'}}> */}
                            
                        {/* </font> */}
                        
                   
                    </p>
                <div  id={`items${indexDate}`} className="collapse" >   
                <table className="col-12 mx-auto border-top">
                <tr>
                    <th className="padTd2" style={{textAlign:"left"}}>Item</th>
                    <th className="padTd2">Action</th>
                    <th>Status</th>
                </tr>
                {storedItems.map((item,index)=>item.date==date?(
                    <>
                        {item.status=="bought"?<tr key={index} className="bg-secondary">
                            <td className="padTd2" style={{textAlign:"left"}}>{item.item}</td>
                            <td className="padTd2">
                                <button className="btn btn-danger btn-sm mr-3" data-toggle="modal" data-target={`#confirm${index}`}>Delete</button>
                                <Link to={`/view/${index}`} className="btn btn-secondary btn-sm ml-3 bg-light" style={{color:'black'}}>View</Link >
                            </td>
                            <td>
                                {item.status}
                            </td>
                        </tr>:<tr key={index} >
                            <td className="padTd2" style={{textAlign:"left"}}>{item.item}</td>
                            <td className="padTd2">
                                <button className="btn btn-danger btn-sm mr-3" data-toggle="modal" data-target={`#confirm${index}`}>Delete</button>
                                <Link to={`/view/${index}`} className="btn btn-secondary btn-sm ml-3">View</Link >
                            </td>
                            <td>
                                {item.status}
                            </td>
                        </tr>}
                        
                        <div className="modal" id={`confirm${index}`} aria-hidden="true">
                            <div className="modal-dialog" role="dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h6 className="text-center mt-3">Delete Item {item.item}</h6>
                                        <button className="close" data-dismiss="modal" aria-aria-label="close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body p-3">
                                        Are you sure you want to delete the item {item.item}.<br /> You will not be able to
                                        retrieve this item if you delete it.
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={()=>deleteItem(index)}>Delete Item</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </>
                ):(<span></span>))}
                </table>
                </div>
            </div>
        ))
    }else{
        mappedView =<p className="text-center">You have no items yet</p>
    }    
    return(
        <>
            <div>
                <Link to="/" className="btn btn-secondary m-3">Back to Home</Link>
                <p className="text-center display-4"><b>ITEMS</b></p>
                {mappedView}
            </div>        

            
        </>
    )
}
export default View;