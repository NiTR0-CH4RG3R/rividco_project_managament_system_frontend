import { get, post, put, del } from '../api/axios'

const TEST_URL = '/ProjectTest'

export async function listTests(projectId, page, itemsPerPage) {
    const tests = [];

    try {
        const response = await get(`${TEST_URL}`, { projectId, page, pageSize: itemsPerPage });
        response?.data?.forEach((test) => {
            tests.push(test)
        })
    }
    catch (error) {
        console.error(error);
    }

    return tests;
}

export async function getTest(id) {
    let test = {};

    try {
        const response = await get(`${TEST_URL}/${id}`);
        test = response?.data;
    }
    catch (error) {
        console.error(error);
    }

    return test;
}

export async function addTest(test) {
    try {
        await post(`${TEST_URL}`, test);
    }
    catch (error) {
        console.error(error);
    }
}

export async function updateTest(test, id) {
    try {
        await put(`${TEST_URL}/${id}`, test);
    }
    catch (error) {
        console.error(error);
    }
}