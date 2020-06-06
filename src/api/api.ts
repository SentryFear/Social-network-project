import axios from "axios";
import {ProfileType, UserType} from "../types/types";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
        "API-KEY": "9c8fa91e-93ff-48c5-8846-3d8192e09910"
    }
});

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export type FollowResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<FollowResponseType>(`follow/${userId}`)
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put<FollowResponseType>(`profile/status`, { status: status }).then(res => res.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put<FollowResponseType>(`profile`, profile ).then(res => res.data);
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`).then(res => res.data)
    }
}

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}