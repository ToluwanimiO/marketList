import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './home';
import Create from './create';
import View from './view';
import Edit from './edit';
import { useState } from 'react';
import Details from './itemDetails';
function App() {
  let [marketList,setMarketList]=useState({item:'',quantity:'',price:''});
  let [total,setTotal]=useState("");
  let storeItem = []
  let [submitStatus,setSubmitStatus]=useState("");
  const saveMList = (e)=>{
    let newList = {...marketList,[e.target.name]:e.target.value}
    setMarketList(newList);
    if(e.target.name=="price"){
      let totalQt=marketList.quantity*e.target.value
      setTotal(totalQt)
    }
    if(e.target.name=="quantity"){
      let totalQt=marketList.price*e.target.value
      setTotal(totalQt)
    }
  }
  const submitMList =(e)=>{
    e.preventDefault();
    // let items = JSON.parse(localStorage.getItem("marketList"));
    let date= new Date;
    let currentDate = date.toLocaleDateString()
    // items.map(obj=>obj.date==currentDate?console.log('exists'):console.log('doesnt'))
    if(marketList.item=="" || marketList.quantity=="" || marketList.price==""){
      setSubmitStatus("Please fill all inputs")
    }else{
    let latestList = {item:marketList.item,quantity:marketList.quantity,price:marketList.price,total:total,date:currentDate,status:'pending'}
    if(localStorage.getItem("marketList")!=null){
      storeItem = JSON.parse(localStorage.getItem("marketList"))
      storeItem.push(latestList)
      console.log(storeItem)
      localStorage.setItem("marketList",JSON.stringify(storeItem))
      setSubmitStatus("Item added succesfully")
    }else{
      localStorage.setItem("marketList",JSON.stringify([latestList]))      
      setSubmitStatus("Item added succesfully")
    }     
    setTotal("");
    setMarketList({item:'',quantity:'',price:''});
  }
  }
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/create" exact>
            <Create marketList={marketList} saveList={saveMList} submitList={submitMList} total={total} submitStatus={submitStatus}/>
          </Route>
          <Route path="/view" exact>
            <View/>
          </Route>
          <Route path="/view/:itemDetails" children={<Details/>}></Route>
          <Route path="/edit/:itemDetails" children={<Edit/>}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
