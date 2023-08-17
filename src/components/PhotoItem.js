import React, { useState } from 'react';
import EnlargedPhoto from './EnlargedPhoto';
import '../style/PhotoItem.css';

export default function PhotoItem({ photo, isEdit, onPhotoClick, isSelected, onImageEnlarge}) {
    const [isEnlarged, setIsEnlarged] = useState(false);

    const handlePhotoClick = () => {
        if (isEdit) {
            onPhotoClick(photo, !isSelected);
        } else {
            setIsEnlarged(true);
            onImageEnlarge(true);
        }
    }

    const closeEnlargedPhoto = () => {
        setIsEnlarged(false);
        onImageEnlarge(false);
    }


    return (
        <div className={`photo-item ${isSelected ? 'selected' : ''}`}>
            <img className='photo'
                src={photo.url}
                alt={photo.title}
                onClick={handlePhotoClick} />
            {isEnlarged &&
                <EnlargedPhoto
                    photo={photo}
                    onClose={closeEnlargedPhoto} />}
        </div>
    );
}