import { useState ,useEffect } from "react";
import styling from "./photosPage.module.css";
import PhotoForm from "../PhotoForm/PhotoForm";
import {doc,onSnapshot ,updateDoc,arrayRemove} from 'firebase/firestore';
import db from '../../firebaseInit';
import Carousel from "../carousel/carousel ";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-spinner-material';



const PhotosPage =(props)=>{
    const [searchFlag,setSearchFlag] =useState(false);
    const [photoFormFlag,setphotoFormFlag] =useState(false);
    const [allPictures,setAllpictures] =useState([]);
    const [currentPhoto,setCurrentPhoto] =useState();
    const [carouselPage,setCarouselPage] =useState(false);
    const [isLoading,setIsLoading] =useState(true);
    const [searchItem,setSearchItem] = useState("");
    // const [searching,setSearching] = useState("");

    
    


    //Getting Photos from the firestore 

    const getData= (id)=>{
         
      onSnapshot(doc(db, "Albums", id), (doc) => {
            const firestorePictures=doc.data().PictureArray;
            if(firestorePictures){
                firestorePictures.sort((pic1,pic2)=>pic2.createdOn - pic1.createdOn);
                setAllpictures(firestorePictures);
            }

        }) 
            }

            
    useEffect(()=>{
        getData(props.albumData.id);
        setIsLoading(false);
        
    },[props]);


    //Handling search Items 
    useEffect(()=>{
     
        onSnapshot(doc(db, "Albums", props.albumData.id), (doc) => {
            const firestorePictures=doc.data().PictureArray;
            if(firestorePictures){
                firestorePictures.sort((pic1,pic2)=>pic2.createdOn - pic1.createdOn);
                let arra = firestorePictures.filter((item) => item.title.includes(searchItem));
                setAllpictures(arra);   
                
            }

        }) 


    },[searchItem,props]);

//handling back button here
    const handleBackButton=()=>{
        props.PhotoPageView(false);
    }


    const handleSearchFlag =()=>{
        if(searchFlag){
            setSearchFlag(false);
            setSearchItem("");
        }else{
            setSearchFlag(true);
        }
    }

   
    const handlePhotoForm =()=>{

        if(photoFormFlag){ 
            localStorage.setItem('title','');
            localStorage.setItem('url','');
            localStorage.setItem('photo','');
            setphotoFormFlag(false);

        }else{
            localStorage.setItem('title','');
            localStorage.setItem('url','');
            localStorage.setItem('photo','');
            setphotoFormFlag(true);
        }
    }

    const handleCarousel=(photo)=>{
        if(carouselPage){
            setCarouselPage(false);
        }else{
            setCurrentPhoto(photo);
            setCarouselPage(true);
        }
    }

    //handling edit photo button here
    const handleEditPhoto=(picture)=>{
       if(!photoFormFlag){ setphotoFormFlag(true);}
        setCurrentPhoto(picture);
        localStorage.setItem('title',picture.title);
        localStorage.setItem('url',picture.url);
        localStorage.setItem('photo',picture);

        
    }

    //handling delete photo button 
    const handleDelete= async (picture)=>{

        const reference = doc(db, "Albums",props.albumData.id );

                await updateDoc(reference, {
                    PictureArray: arrayRemove(picture)
                    });

                toast.success("Photo Deleted successfully!");
            
    }



    return <>


    {  carouselPage? <Carousel handleCarousel={handleCarousel} allPictures={allPictures} currentPhoto={currentPhoto}/>  :

    <div className={styling.photoPageMain}>

        <ToastContainer/>
        {photoFormFlag?<PhotoForm albumData={props.albumData} handlePhotoForm={handlePhotoForm} albumId={props.albumData.id} allPictures={allPictures} currentPhoto={currentPhoto} />:null}
        <div className={styling.PageOptions}>
            <div className={styling.firstDivOptions}>
                <div className={styling.Imagediv} onClick={handleBackButton}></div>
                <div>{allPictures.length!==0?<h1>Images in {props.albumData.AlbumName}</h1>:<h1> No images found in the album.</h1>}</div>

            </div>
            <div className={styling.SecondDivOptions} >
                {searchFlag?<div className="searchItems"><input type="text" onChange={(e)=>{setSearchItem(e.target.value);}} placeholder="Search" autoFocus ></input> <img src="https://cdn-icons-png.flaticon.com/128/2723/2723639.png" alt="searchCrossButton" onClick={handleSearchFlag} ></img> </div> : <div className={styling.searchIcon} onClick={handleSearchFlag}></div>}
                {photoFormFlag?<button className={styling.addImage2} onClick={handlePhotoForm}>Cancel</button>:<button className={styling.addImage} onClick={handlePhotoForm}>Add Image</button>}
            </div>
            
        </div>
        
        
        <div  className={styling.Pictures}>
                {isLoading?<Spinner className={styling.Spinner} radius={120} color={"white"} stroke={2} visible={true} />:<>
            {allPictures.map((picture,id)=><>
                <div key={id} className={styling.PictureCard} onMouseDown={e =>{ e.stopPropagation();handleCarousel(picture,id)}} >
                    <div className={styling.editDiv}>
                        <div className={styling.editButtonDiv} onMouseDown={e =>{ e.stopPropagation();handleEditPhoto(picture);}}  ><img alt="editButton" src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"></img></div>
                        <div className={styling.deleteButtonDiv} onMouseDown={e =>{ e.stopPropagation();handleDelete(picture);}}><img alt="deleteButton" src="https://cdn-icons-png.flaticon.com/128/6711/6711573.png"></img></div>
                    </div>
                    
                <div className={styling.ImageContainer} >
                <img src={picture.url} alt='AlbumImage'></img>
                </div>
                <h3>{picture.title}</h3>    
                </div>
            
            
            </>)}</>}
        
        </div>

    </div>}
    </>
}


export default PhotosPage;