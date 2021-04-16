import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '397aad83-4661-4e77-8514-df8ec891b853'
  }
})

export const usersAPI = {
  getUsers(pageNumber: number = 1, pageSize: number = 10) {
    return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
      .then(response => response.data);
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`)
      .then(response => response.data);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`)
      .then(response => response.data);
  },
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`)
      .then(response => response.data);
  }
}

export const authAPI = {
  me() {
    return instance.get('auth/me', { withCredentials: true })
  }
}