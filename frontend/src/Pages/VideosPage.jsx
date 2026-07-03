import React from 'react';
import GalleryHero from '../Components/Gallery/GalleryHero';
import Vid from '../Components/Gallery/Vid';
import VideoG from '../Components/Gallery/VideoG';

const VideosPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-teal-50 pt-20'>
      <div className="-mx-0 px-0">
        <Vid />
      </div>
      <VideoG />
    </div>
  );
};

export default VideosPage;
