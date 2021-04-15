import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '397aad83-4661-4e77-8514-df8ec891b853'
  }
})

export const usersAPI = {
  getUsers(pageNumber, pageSize) { 
    return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
      .then(response => response.data);
  }
}