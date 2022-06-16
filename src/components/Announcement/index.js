import React from 'react'
import '@syncfusion/ej2-layouts/styles/material.css';

const Announcement = () => {
    return (
      <div align="center">
        <div className="e-card" id="basic" style={{ width: `900px`,height: `200px`} }>
          <div className="e-card-header" align="center" style={{background: '#CEBDBD'} } >
            <div className="e-card-header-caption">
              <h3 className="e-card-title" style={{color:'grey'}}>Announcement</h3>
            </div>
          </div>
          
          <div className="e-card-content" align="left" style={{height:`200px`}}>
            
            <h3>1. 6/20 demo <br/></h3>
            <div className="e-card-separator"/>
            <h3> 2. 6/14 上傳檔案 <br/></h3>
            <div className="e-card-separator"/>
           
          </div>
        </div>
      </div>

    )
}

export default Announcement