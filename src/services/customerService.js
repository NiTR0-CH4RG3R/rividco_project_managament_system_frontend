import { get, post, put, del } from '../api/axios'

const CUSTOMER_URL = '/Customer'

export async function listCustomers(page, itemsPerPage) {
  const customers = []

  try {
    const response = await get(CUSTOMER_URL, { page, pageSize: itemsPerPage })
    response?.data?.forEach((customer) => {
      customers.push({
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        category: customer.category,
        address: customer.address,
        contact: customer.phone01,
      })
    })
  } catch (error) {
    console.error(error)
    Promise.reject(error)
  }

  return customers
}

export async function listAllCustomers() {
  const customers = []

  try {
    const response = await get(`${CUSTOMER_URL}/all`)
    response?.data?.forEach((customer) => {
      customers.push({
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        category: customer.category,
        address: customer.address,
        phone01: customer.phone01,
      })
    })
  } catch (error) {
    console.error(error)
  }

  return customers
}

export async function getCustomer(id) {
  let customer = {}

  try {
    const response = await get(`${CUSTOMER_URL}/${id}`)
    customer = response?.data
  } catch (error) {
    console.error(error)
  }

  return customer
}

export async function addCustomer(customer) {
  try {
    await post(CUSTOMER_URL, customer)
  } catch (error) {
    console.error(error)
  }
}

export async function updateCustomer(customer, id) {
  try {
    await put(`${CUSTOMER_URL}/${id}`, customer)
  } catch (error) {
    console.error(error)
  }
}

export async function deleteCustomer(id) {
  try {
    await del(`${CUSTOMER_URL}/${id}`)
  } catch (error) {
    console.error(error)
  }
}
