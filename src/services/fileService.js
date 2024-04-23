import { upload, download } from '../api/axios'

const FILE_URL = '/Files'

export async function uploadFile(filepath) {
    const file = new File([filepath], filepath);

    try {
        const response = await upload(`${FILE_URL}`, { formFile: file });
        return response?.data;
    } catch (error) {
        console.error(error)
    }

    return null;
}

export async function downloadFile(path) {

    try {
        const response = await download(`${FILE_URL}`, { path });
        return new File([response?.data], path.split('/').pop());
    } catch (error) {
        console.error(error)
    }

    return null;
}