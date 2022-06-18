import React, { useEffect, useState } from 'react'
import '../../css/carousel.css'

const Carousel = (props) => {

    const {children, show, lastSpace} = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    
    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])
    
    const next = () => {
        if (currentIndex < (length-show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }
    
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    let flag = false;
    if (show > 1) flag = true;

    return (
        <div className={ flag ? "carousel-container" : "else" }>
            <div className="carousel-wrapper">
                {
                    currentIndex > 0 &&
                    <button onClick={prev} className="left-arrow">&lt;</button>
                }
                
                <div className="carousel-content-wrapper">
                    <div className={`carousel-content show-${show}` }
                        //  style={{ transform: `translateX(-${currentIndex * (100 / show)}%)`, height: "50%" }}>
                         style={{ transform: `translateX(-${currentIndex/(length-show)*lastSpace}px)`, height: "50%" }}>
                        {children}
                    </div>
                </div>

                {
                    currentIndex < (length-show) &&
                    <button onClick={next} className="right-arrow">&gt;</button>
                }
                
            </div>
        </div>
    )


}



export default Carousel