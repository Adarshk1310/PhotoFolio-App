import Style from './albumForm.module.css'

import React, { useRef } from 'react';


const AlbumForm =(props)=>{
    const{createAlbum} = props
    const inputRef = useRef();

   //handling form submit here

    const formhandler= async (e)=>{
        e.preventDefault();
        console.log(inputRef.current.value);
        if(inputRef.current.value!==""){

            createAlbum(inputRef.current.value)

        }else{
            return;
        }
    }
       

    return<>
             
        <div className={Style.albumformmain}>

        <div className={Style.heading}><h1>Create an album</h1></div>
        <div className={Style.albumform}>
            <form onSubmit={formhandler}>
            <input className={Style.textarea} ref={inputRef} placeholder='Album Name' type="text"></input>
            <button type='button' className={Style.clearbutton} onClick={()=>{inputRef.current.value="";}} color="red">Clear</button>
            <button type='Submit' className={Style.createbutton} color="#07f">Create</button>
            </form>

        </div>

        </div>


    
    </>

}


export default AlbumForm;