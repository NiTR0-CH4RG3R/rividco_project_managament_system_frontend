import { get, post, put, del } from '../api/axios'

const VENDOR_URL = '/Vendor'

export async function listVendors(page, itemsPerPage) {
    const vendors = [];

    try {
        const response = await get(VENDOR_URL, { page, pageSize: itemsPerPage });
        response?.data?.forEach((vendor) => {
            vendors.push(vendor)
        })
    }
    catch (error) {
        console.error(error);
    }

    return vendors;
}

export async function listAllVendors() {
    const vendors = [];

    try {
        const response = await get(`${VENDOR_URL}/all`);
        response?.data?.forEach((vendor) => {
            vendors.push(vendor)
        })
    }
    catch (error) {
        console.error(error);
    }

    return vendors;
}

export async function getVendor(id) {
    let vendor = {};

    try {
        const response = await get(`${VENDOR_URL}/${id}`);
        vendor = response?.data;
    }
    catch (error) {
        console.error(error);
    }

    return vendor;
}

export async function addVendor(vendor) {
    try {
        await post(VENDOR_URL, vendor);
    }
    catch (error) {
        console.error(error);
    }
}

export async function updateVendor(vendor, id) {
    try {
        await put(`${VENDOR_URL}/${id}`, vendor);
    }
    catch (error) {
        console.error(error);
    }
}