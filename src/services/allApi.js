const { BASE_URL } = require("./baseUrl")
const { commonApi } = require("./commonApi")

//add items
export const addItem = async (body) => {
    return await commonApi("post", `${BASE_URL}/api/create`, body);
}

//get all items
export const getAllItems = async () => {
    return await commonApi("get", `${BASE_URL}/api/all/items`, '');
}

//get One items
export const getItemById = async (id) => {
    return await commonApi("get", `${BASE_URL}/api/item/${id}`, '');
}

//delete items
export const deleteItem = async (id) => {
    return await commonApi("delete", `${BASE_URL}/api/delete/${id}`, {});
}

//update items
export const updateItem = async (id, body) => {
    return await commonApi("put", `${BASE_URL}/api/update/${id}`, body);
}