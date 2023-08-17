import { PHOTOS_API_URL } from '../global/constants';

let offset = 0;

export async function fetchPhotos(limit = 20) {
    try {
        const response = await fetch(`${PHOTOS_API_URL}?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        offset += limit;
        return data.photos.map(({ id, title, url }) => ({ id, title, url }));
    } catch (error) {
        console.error(error);
        throw error;
    }
}
