import { useEffect, useRef, useState } from "react";
import styling from "./PhotoForm.module.css";
import { doc,updateDoc,arrayUnion} from "firebase/firestore";
import db from "../../firebaseInit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const PhotoForm =(props)=>{

    const [ediPhoto,setEditPhoto] =useState(false);
    const [photo,setPhoto] =useState();
    // const[updatedArray,setUpdatedArray] = useState();


    const Title =useRef();
    const url =useRef();

    useEffect(()=>{
        // Using useEffect to get the title and link of the selected card from the localstorage and setting the ref when edit button in clicked and 

        let title = localStorage.getItem('title');
        let link = localStorage.getItem('url');
        let object = localStorage.getItem('photo');

        if(title && link && object){
            Title.current.value= title;
            url.current.value =link;
            setPhoto(object);
            setEditPhoto(true);
        }
        
    },[props.currentPhoto])

// Handling Add photo here

    const addPicture=async(id)=>{
        const washingtonRef = doc(db, "Albums", id );

        await updateDoc(washingtonRef, {
           
            PictureArray:arrayUnion({title:Title.current.value,url:url.current.value,createdOn:new Date()}),
        
          });
          toast.success("Photo added successfully!");

        console.log(props.albumData);
    }


//Handlling Update photo here

    const updatePhoto = async(photo)=>{

        let Allllpic =props.allPictures;

        let updatePic = Allllpic.map((picture)=>{

                    if(picture===props.currentPhoto){
                        picture.title=Title.current.value;
                        picture.url =url.current.value;
                    }
            return picture;

        });

        console.log(updatePic);
   
            const albumDocRef = doc(db, "Albums", props.albumId);
                await updateDoc(albumDocRef, {
                   PictureArray:updatePic
                });
                toast.success("Photo Updated successfully!!");

    }

    //Handling form submit Here

    const formhandler=(e)=>{
        e.preventDefault();
        
        if(Title.current.value && url.current.value ){
            if(ediPhoto){
                updatePhoto(photo);
                Title.current.value="";
                url.current.value="";
                
            }else{
            addPicture(props.albumData.id);
            Title.current.value="";
            url.current.value="";
            
        }
        }
        

       
    }

    return<>
    <ToastContainer />
    <div className={styling.photoformmain}>

        <div className={styling.heading}><h1>Add image to Album</h1></div>
        <div className={styling.photoform}>
        <form onSubmit={formhandler}>
        <input className={styling.textarea} ref={Title} placeholder='Title' type="text"></input>
        <input className={styling.textarea} ref={url} placeholder='Image URL' type="text"></input>
        <div className={styling.Buttons}><button type='button' className={styling.clearbutton} onClick={()=>{Title.current.value="";url.current.value=""}} color="red">Clear</button>
        <button type='Submit' className={styling.Addbutton} color="#07f">Add</button></div>
        </form> 

    </div>

</div>

    </>
}


export default PhotoForm;