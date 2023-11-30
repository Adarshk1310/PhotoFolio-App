import Header from './header.js';
import './App.css';
import AlbumList from './Components/AlbumList/albumList.js';
import { useState } from 'react';
import PhotosPage from './Components/photosPage/photoPage.js';




function App() {

  const [photoPageCheck,setPhotoPageCheck] =useState(false);
  const [albumData,setAlbumData] =useState({});


  //setting the flag for photos page of the album.

  const PhotoPageView =(photoView)=>{

    if(photoView){
      setPhotoPageCheck(true);
    }else{
      setPhotoPageCheck(false);
    }
  }

  
  const settingAlbumData=(album)=>{
    setAlbumData(album);
  }




  
  return (
    <div className="App">
     <Header/>
          
        {photoPageCheck? <PhotosPage albumData={albumData} PhotoPageView={PhotoPageView} />:<AlbumList settingAlbumData={settingAlbumData}  PhotoPageView={PhotoPageView}/>}
    </div>
  );
}

export default App;
