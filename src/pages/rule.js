import React from "react";
import "../css/card.css"
import "../css/imagestyle.css";  //align picture


const Rule = () => {
  return (
    <div className="index-page">
      <div align="center" style={{marginTop:"4%",marginBottom:"4%"}}>
          <div className="card-FR" id="basic" style={{ width: `900px`,height: `500px`} }>
            <div className="card-header" align="center" style={{background: '#CEBDBD'} } >
              <div className="card-header-caption">
                <h3 className="card-title">平台規範</h3>
              </div>
            </div>
            
            <div className="card-content-FR" align="left" style={{height:`200px`}}>
              <h3>1. 禁止上傳違法/盜版書籍<br/></h3>
              <div className="card-separator"/>
              <h3>2. 禁止將賣家資訊隨意散佈 <br/></h3>
              <div className="card-separator"/>
              <h3>3. &emsp;&emsp;&emsp;&emsp;&emsp;...&emsp;&emsp;&emsp;&emsp;&emsp; <br/></h3>
              <div className="card-separator"/>
              <h3>4. &emsp;&emsp;&emsp;&emsp;&emsp;...&emsp;&emsp;&emsp;&emsp;&emsp;  <br/></h3>
              <div className="card-separator"/>
            </div>
          </div>
        </div>
    </div>
  );
};
  

export default Rule;