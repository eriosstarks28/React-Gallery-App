import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoList = props => {
    const results = props.data;
    let photos = results.map(photo =>
        <Photo url={'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'} key={photo.id} alt='' />
    );

    if (photos.length > 0) {



        return (
            <div className='photo-container'>
                <h2>{props.title}</h2>
                <ul>{photos}</ul>
            </div>



        );
    } else {
        return (
            <div className='photo-container'>
                <NotFound />
            </div>
        );
    }
};

export default PhotoList;