import React from 'react';
import '../style/EnlargedPhoto.css';

export default function EnlargedPhoto({ photo, onClose }) {
    return (
        <div className="enlarged-photo" onClick={onClose}>
            <img src={photo.url} alt={photo.title} />
        </div>
    );
}