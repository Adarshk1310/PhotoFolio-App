import styling from './alList.module.css';
import AlbumForm from '../AlbumForm/albumForm';
import { useState } from 'react';
import db from '../../firebaseInit';
import { useEffect } from 'react';
import {addDoc,collection,onSnapshot } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-spinner-material';

const AlbumList =(props)=>{

    const [addAlbum,setAddAlbum] =useState(false);
    const [albums,setAlbums] = useState([]);
    const [isLoading,setIsLoading] =useState(true);

// Getting all the Albums from the firestore 

    const getData= ()=>{

                 onSnapshot(collection(db, "Albums"), (col) => {

                    const firestoreAlbums =  col.docs.map((doc)=>{
                        
                        return{
                            id:doc.id,
                            ...doc.data()
                        }
                        });

                    firestoreAlbums.sort((album1,album2)=>album2.createdOn - album1.createdOn);
                     setAlbums(firestoreAlbums);   

        });
    }


// Adding Album to Firestore

    const createAlbum = async(inputRef)=>{
        
        const docRef = await addDoc(collection(db, "Albums"), {
            AlbumName:inputRef,
            PictureArray:[],
            createdOn:new Date()
          });
          toast.success("Album added successfully!");
        console.log("Document written with ID: ", docRef.id);

    }
    



    useEffect(()=>{

            getData();
            setIsLoading(false);

            },[])





    const handleAddAlbum =()=>{
        if(addAlbum){
            setAddAlbum(false);
        }else{
            setAddAlbum(true);
        }
    }



// handling click on Album Card 

    const handleCardClick=(album)=>{
        
        props.PhotoPageView(true);
        props.settingAlbumData(album);

    }




    return <>

    {addAlbum?<AlbumForm createAlbum={createAlbum}/>:null}
    <ToastContainer />
  <div className={styling.mainApp}>
        <div className={styling.YourAlbum}>
            <div><h1 className={styling.Heading}>Your albums</h1></div>
            <div className={styling.ButtonDiv}>{addAlbum?<button className={styling.AlbumButton2} onClick={handleAddAlbum}>Cancel</button>:<button className={styling.AlbumButton} onClick={handleAddAlbum}>Add album</button>}</div>
        </div>
        <div className={styling.allalbums}>
        {isLoading?  <Spinner className={styling.Spinner} radius={120} color={"white"} stroke={2} visible={true} />:<>
        {albums.map((album)=><>
            <div className={styling.albumCard} onClick={()=>{handleCardClick(album)}}> 
                <div className={styling.ImageContainer}><img src='https://cdn.iconscout.com/icon/free/png-512/free-apple-photos-493155.png?f=avif&w=256' alt='AlbumImage'></img></div>
                <h3>{album.AlbumName}</h3>
                </div> 
        </>)}</>
        }
        </div>
        </div>
    
    
    </>

}


export default AlbumList;