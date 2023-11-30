import styling from "./carousel.module.css";
import BackButton from "../../Images/BackButton.png";
import NextButton from "../../Images/NextIcon.png";
import {  useState } from "react";

const Carousel =(props)=>{
    let currentIndex =props.allPictures.indexOf(props.currentPhoto);
    const[index,setIndex] =useState(currentIndex);
    const[currentImage,setCurrentImage]=useState(props.currentPhoto.url);

    const prevImage = ()=>{
        
        if(index >0){
           setCurrentImage(props.allPictures[index-1].url);
           setIndex(index-1);

        }
   }

    const nextImage = ()=>{
        
         if(index < props.allPictures.length-1){
            setCurrentImage(props.allPictures[index+1].url);
            setIndex(index+1);

         }
    }

    return<>
    <div className={styling.carouselMain}>
        <div className={styling.carouselOptions}>
            <div className={styling.backButtonOuter} onClick={prevImage}><div className={styling.backButton}><img alt="backButton" src={BackButton}></img></div></div>
            <div className={styling.photo}><img alt="" src={currentImage}></img></div>
            <div className={styling.nextButtonOuter} onClick={nextImage}><div className={styling.nextButton}><img alt="nextButton" src={NextButton}></img></div></div>
        </div>
        <div className={styling.crossButton} onClick={()=>{props.handleCarousel();}}><img  alt="crossButton" src="https://cdn-icons-png.flaticon.com/128/1828/1828774.png"></img></div>
     

    </div>
    </>
}


export default Carousel;