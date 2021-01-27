import React from 'react';
import {Link} from 'react-router-dom';
function Home(){
    return(
        <>
            <div className="container mx-auto card col-3" style={{marginTop:'150px',padding:'50px'}}>
                <div className="row">
                    <div className="col-12">
                        <Link to="/create" className="btn btn-info btn-lg d-block mx-auto m-3" style={{height:'50px'}}>Create</Link>
                    </div>
                    <div className="col-12">
                        <Link to="/view" className="btn btn-secondary btn-lg d-block mx-auto m-3" style={{height:'50px'}}>View</Link>
                    </div>
                </div>
            </div>
            
            {/* <div className="col-2 mx-auto p-3" style={{marginTop:'180px'}}>
                
                
            </div> */}
        </>
    )
}
export default Home;