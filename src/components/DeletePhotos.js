import React from 'react';
import { IoMdTrash } from 'react-icons/io';
import '../style/DeletePhotos.css';

export default function DeletePhotos({ onDelete, isEdit }) {
    return (
        <div>
            <button className={`delete-photos ${isEdit && "active"}`} onClick={onDelete}>
                <IoMdTrash />
            </button>
        </div>
    );
}
