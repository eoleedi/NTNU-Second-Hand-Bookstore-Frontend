import React from 'react';
import Topbar from "../components/Topbar";
import "../css/card.css"
const About = () => {
  return (
    <div>
    <Topbar />
      <div align="center" style={{marginTop:"4%",marginBottom:"4%"}}>
        <div className="card-FR" id="basic" style={{ width: `900px`,height: `500px`} }>
          <div className="card-header" align="center" style={{background: '#CEBDBD'} } >
            <div className="card-header-caption">
              <h3 className="card-title">About</h3>
            </div>
          </div>
          
          <div className="card-content-FR"  style={{height:`200px`}}>
            
            <h3 align="center">* 目的</h3>
            <h3> &emsp;&emsp;&emsp;&emsp;&emsp;我們實作此平台以集合所有二手書的平台供大學生使用，達到資訊清晰、資訊整合、相同商品價格容易比較等特性。<br/></h3>
            <div className="card-separator"/>
            <h3 align="center">* 動機<br/></h3>
            <h3>&emsp;&emsp;&emsp;&emsp;&emsp;我們觀察到二手書交易常在臉書社團、校內學長姐聊天群組等不同的地方出現，且少有跨校交易二手書的情況，導致資訊分散且價格也大不相同。<br/></h3>
            <div className="card-separator"/>
            <h3>&emsp;&emsp;&emsp;&emsp;&emsp;......&emsp;&emsp;&emsp;&emsp;&emsp;<br/></h3>
            <h3>&emsp;&emsp;&emsp;&emsp;&emsp;......&emsp;&emsp;&emsp;&emsp;&emsp;<br/></h3>
            
           
           </div>
        </div>
      </div>
    </div>
  );
};
  
export default About;