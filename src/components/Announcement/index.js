import React from 'react'
import '../../css/card.css'
const Announcement = () => {
    return (
      <div align="center">
        <div className="card" id="basic" style={{ width: `900px`,height: `200px`} }>
          <div className="card-header" align="center" style={{background: '#CEBDBD'} } >
            <div className="card-header-caption">
              <h3 >Announcement</h3>
            </div>
          </div>
          
          <div className="card-content" align="left" style={{height:`200px`}}>
            
            <h3>1. 6/20 demo <br/></h3>
            <div className="card-separator"/>
            <h3> 2. 6/14 上傳檔案 <br/></h3>
            <div className="card-separator"/>
           
          </div>
        </div>
      </div>

    )
}

export default Announcement