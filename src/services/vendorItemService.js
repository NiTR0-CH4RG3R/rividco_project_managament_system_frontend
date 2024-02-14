import { get, post, put, del } from '../api/axios'

const VENDORITEM_URL='/vendor/item'

export async function listVendorItems(page, itemsPerPage) {
    const vendorItems = [];

    try {
        const response = await get(VENDORITEM_URL, { page, pageSize: itemsPerPage });
        response?.data?.forEach((vendorItem) => {
            vendorItems.push({
                id: vendorItem.id,
                vendorId:vendorItem.vendorId,
                productName: vendorItem.productName,
                price: vendorItem.price,
                warrantyDuration:vendorItem.warrantyDuration,
                capacity:vendorItem.capacity,


            })
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