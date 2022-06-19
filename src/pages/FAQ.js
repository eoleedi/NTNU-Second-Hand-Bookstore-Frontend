import React from 'react';
import "../css/card.css"
import "../css/imagestyle.css";  //align picture


const FAQ = () => {
  return (
    <div className="index-page">
      <div align="center" style={{marginTop:"4%",marginBottom:"4%"}}>
        <div className="card-FR" id="basic" style={{ width: `900px`,height: `500px`} }>
          <div className="card-header" align="center" style={{background: '#CEBDBD'} } >
            <div className="card-header-caption">
              <h3 className="card-title">FAQ</h3>
            </div>
          </div>
          
          <div className="card-content-FR" align="left" style={{height:`200px`}}>
            
            <h3>Q1: &emsp;&emsp;如何登入/註冊?&emsp;&emsp; <br/></h3>
            <h3> A: &emsp;&emsp;&emsp;點擊人像icon&emsp;&emsp; <br/></h3>
            <div className="card-separator"/>
            <h3>Q2:&emsp; &emsp;&emsp;如何搜尋商品?&emsp;&emsp; <br/></h3>
            <h3>A:&emsp;在上方搜尋欄輸入關鍵字<br/></h3>
            <div className="card-separator"/>
            <h3>Q3:&emsp;&emsp;&emsp;&emsp;&emsp;......&emsp;&emsp;&emsp;&emsp;&emsp; <br/></h3>
            <h3>A: &emsp;&emsp;&emsp;&emsp;&emsp;...... &emsp;&emsp;&emsp;&emsp;<br/></h3>
            <div className="card-separator"/>
           
          </div>
        </div>
      </div>
    </div>
  );
};


export default FAQ;