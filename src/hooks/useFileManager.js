import useAuthContext from "../auth/useAuthContext";
import axios from "../api/axios";

export default function useFileManager() {
    const { auth } = useAuthContext();

    const getFileURL = (path) => {
        const formData = new FormData();
        formData.append('userId', auth.userId);
        formData.append('path', path);
        return `${axios?.defaults?.baseURL}/Files?${new URLSearchParams(formData).toString()}`;
    }

    return { getFileURL };
}