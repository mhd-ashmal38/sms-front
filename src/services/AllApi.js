import { BASE_URL } from "./baseUrl";
import { commonAPI } from "./commonAPI";

// add user 
export const addUser=async(body,header)=>{
    return await commonAPI("POST",`${BASE_URL}/add`,body,header)
}

// get users
export const allUsers=async(search)=>{
    return await commonAPI("GET",`${BASE_URL}/get-all-users?search=${search}`,"")
}

// delete user
export const deleteUser=async(id)=>{
    return await commonAPI("DELETE",`${BASE_URL}/delete-user/${id}`,{})
}

// update user
export const editUser=async(id,body,header)=>{
    return await commonAPI("PUT",`${BASE_URL}/edit/user/${id}`,body,header)
}
