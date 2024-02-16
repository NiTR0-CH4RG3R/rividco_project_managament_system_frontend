import { get, post, put, del } from '../api/axios'

const VENDORITEM_URL = '/VendorItem'

export async function listVendorItems(page, itemsPerPage) {
    const vendorItems = [];

    try {
        const response = await get(VENDORITEM_URL, { page, pageSize: itemsPerPage });
        response?.data?.forEach((vendorItem) => {
            vendorItems.push(vendorItem)
        })
    }
    catch (error) {
        console.error(error);
    }

    return vendorItems;
}

export async function getVendorItem(id) {
    let vendorItems = {};

    try {
        const response = await get(`${VENDORITEM_URL}/${id}`);
        vendorItems = response?.data;
    }
    catch (error) {
        console.error(error);
    }

    return vendorItems;
}

export async function addVendorItem(vendorItem) {
    try {
        await post(VENDORITEM_URL, vendorItem);
    }
    catch (error) {
        console.error(error);
    }
}

export async function updateVendorItem(vendorItem, id) {
    try {
        await put(`${VENDORITEM_URL}/${id}`, vendorItem);
    }
    catch (error) {
        console.error(error);
    }
}