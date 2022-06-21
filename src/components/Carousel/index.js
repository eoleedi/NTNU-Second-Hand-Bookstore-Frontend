import React, { useEffect, useState } from 'react'
import '../../css/carousel.css'


const Carousel = (props) => {

    const {children, show, lastSpace, imageWidth} = props
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const next = () => {
        if (currentIndex < (children.length-show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }
    
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    return (
        <div className={"carousel-container"}>
            <div className="carousel-wrapper">
                {
                    currentIndex > 0 &&
                    <button onClick={prev} className="left-arrow">&lt;</button>
                }
                
                <div className="carousel-content-wrapper">
                    {
                        lastSpace && 
                        <div className={`carousel-content show-${show}` }
                             style={{ transform: `translateX(-${currentIndex/(children.length-show)*lastSpace}px)`}}>
                             {/* style={{ transform: `translateX(-${currentIndex/(children.length-show)*lastSpace}px)`, height: "50%" }}> */}
                            {children}
                        </div>
                    }
                    {
                        imageWidth && 
                        <div className={`carousel-content show-${show}` }
                             style={{ transform: `translateX(-${currentIndex/(children.length-show)*imageWidth*(children.length-1)}px)`}}>
                             {/* style={{ transform: `translateX(-${currentIndex/(children.length-show)*lastSpace}px)`, height: "50%" }}> */}
                            {children}
                        </div>
                    }
                </div>
                
                {
                    currentIndex < (children.length-show) &&
                    <button onClick={next} className="right-arrow">&gt;</button>
                }
                
            </div>
        </div>
    )


}



export default Carousel