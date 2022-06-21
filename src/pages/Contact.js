import React from 'react';
import "../css/card.css"
import "../css/imagestyle.css";  //align picture


const Contact = () => {
  return (
    <div className="index-page">
      <div align="center" style={{marginTop:"4%",marginBottom:"4%"}}>
        <div className="card-FR" id="basic" style={{ width: `900px`,height: `500px`} }>
          <div className="card-header" align="center" style={{background: '#CEBDBD'} } >
            <div className="card-header-caption">
              <h3 className="card-title">Contact</h3>
            </div>
          </div>
          
          <div className="card-content-FR"  style={{height:`200px`}}>
            
            <h3 align="center">* 組員姓名</h3>
            <h3> &emsp;&emsp;&emsp;&emsp;&emsp;洪偉倫、陳映澄、蔡鳳俊、蕭瀜&emsp;&emsp;&emsp;&emsp;&emsp;<br/></h3>
            <div className="card-separator"/>
            <h3 align="center">* 組員學號<br/></h3>
            <h3>&emsp;&emsp;&emsp;40747026S、40751028S、40847008S、40847025S&emsp;&emsp;<br/></h3>
            <div className="card-separator"/>
            <h3>&emsp;&emsp;&emsp;&emsp;&emsp;......&emsp;&emsp;&emsp;&emsp;&emsp;<br/></h3>
            <h3>&emsp;&emsp;&emsp;&emsp;&emsp;......&emsp;&emsp;&emsp;&emsp;&emsp;<br/></h3>
            <div className="card-separator"/>
          
          </div>
        </div>
      </div>
    </div>
  );
};


export default Contact;