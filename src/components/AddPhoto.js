import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import Photo from '../modals/Photos';
import '../style/AddPhoto.css';

export default function AddPhoto({ onAdd }) {
    const [link, setLink] = useState("");

    const handleAdd = () => {
        if (link) {
            onAdd(new Photo(Date.now(), "", link))
            setLink("")
        }
    };

    return (
        <div className="add-photo">
            <input type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Add photo link" />
            <button onClick={handleAdd}><IoMdAdd /></button>
        </div>
    );
}
