import React, { useEffect, useState } from 'react';
import PhotoGrid from '../components/PhotoGrid';
import AddPhoto from '../components/AddPhoto';
import DeletePhotos from '../components/DeletePhotos';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { fetchPhotos } from '../api/slingacademy';
import { MdModeEdit, MdOutlineClose } from 'react-icons/md';
import '../style/App.css';

export default function App() {
    const [photos, setPhotos] = useState(new Set());
    const [selectedPhotos, setSelectedPhotos] = useState(new Set());
    const [isEdit, setIsEdit] = useState(false);
    const [isImageEnlarged, setImageEnlarged] = useState(false);


    const loadMorePhotos = async () => {
        try {
            const newPhotos = await fetchPhotos();
            setPhotos(prevPhotos => new Set([...prevPhotos, ...newPhotos]));
        } catch (error) {
            console.error("Failed to load more photos:", error);
        }
    }

    useEffect(loadMorePhotos, []);
    useInfiniteScroll(loadMorePhotos);

    const addPhotoListener = (photo) => {
        setPhotos(prevPhotos => new Set([photo, ...prevPhotos]));
    }

    const deletePhotosListener = () => {
        if (window.confirm(`Are you sure you want to delete the ${selectedPhotos.size} selected photos?`)) {
            const updatedPhotos = new Set(photos);
            selectedPhotos.forEach(photo => updatedPhotos.delete(photo));
            setPhotos(updatedPhotos);
            setSelectedPhotos(new Set());
        }
    }

    const onPhotoClickListener = (photo, isSelected) => {
        if (isEdit) {
            setSelectedPhotos(prev => {
                const updatedSelected = new Set(prev);
                if (isSelected) {
                    updatedSelected.add(photo);
                } else {
                    updatedSelected.delete(photo);
                }
                return updatedSelected;
            });
        }
    }

    const onEditClickListener = () => {
        if (isEdit) {
            setSelectedPhotos(new Set());
        }
        setIsEdit(prevMode => !prevMode);
    }

    const onImageEnlargeListener = (enlarged) => {
        setImageEnlarged(enlarged);
    }


    return (
        <div className="app">
            <AddPhoto onAdd={addPhotoListener} />
            <DeletePhotos onDelete={deletePhotosListener} isEdit={isEdit} />
            <PhotoGrid
                photos={[...photos]}
                isEdit={isEdit}
                onPhotoClick={onPhotoClickListener}
                selectedPhotos={selectedPhotos}
                onImageEnlarge={onImageEnlargeListener} />
            
            {!isImageEnlarged &&
                <button className="edit-button" onClick={onEditClickListener}>
                    {isEdit ? <MdOutlineClose /> : <MdModeEdit />}
                </button>}
        </div>
    );
}
