import {get,post,put,del} from '../api/axios';

const ITEM_URL ='/ProjectItem'

export async function listItems(projectId, page, itemsPerPage) {
    const items = [];

    try {
        const response = await get(`${ITEM_URL}`, { projectId, page, pageSize: itemsPerPage });
        response?.data?.forEach((item) => {
            items.push(item)
        })
    }
    catch (error) {
        console.error(error);
    }

    return items;
}

export async function getitem(id) {
    let items = {};

    try {
        const response = await get(`${ITEM_URL}/${id}`);
        items = response?.data;
    }
    catch (error) {
        console.error(error);
    }

    return items;
}

export async function addItem(item) {
    try {
        await post(`${ITEM_URL}`, item);
    }
    catch (error) {
        console.error(error);
    }
}

export async function updateItem(item, id) {
    try {
        await put(`${ITEM_URL}/${id}`, item);
    }
    catch (error) {
        console.error(error);
    }
}