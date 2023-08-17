import React from 'react';
import PhotoItem from './PhotoItem';
import '../style/PhotoGrid.css';

export default function PhotoGrid({ photos, isEdit, onPhotoClick, selectedPhotos, onImageEnlarge}) {
    return (
        <div className="photo-grid">
            {[...photos].map(photo => (
                <PhotoItem key={photo.id}
                    photo={photo}
                    isEdit={isEdit}
                    onPhotoClick={onPhotoClick}
                    isSelected={selectedPhotos.has(photo)}
                    onImageEnlarge={onImageEnlarge}/>
            ))}
        </div>
    );
}
