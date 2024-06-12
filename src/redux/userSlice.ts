/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";
import { getAccessToken } from "../utils/supportFunctions";

interface UserData {
    companyLimit: number;
    usedCompanyCount: number;
}

interface UserState {
    isAuthorized: boolean;
    isLoading: boolean;
    userInfo: UserData;
}

const initialState: UserState = {
    isAuthorized: false,
    isLoading: false,
    userInfo: {
        companyLimit: 0,
        usedCompanyCount: 0,
    },
};

export const loginUser = createAsyncThunk(
    "user/login",
    async (data: { login: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/account/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const serverError = await response.json();
                return rejectWithValue(serverError);
            }

            const result = await response.json();
            return result;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserInfo = createAsyncThunk(
    "user/getUserInfo",
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = getAccessToken();
            if (accessToken === null) {
                return rejectWithValue("Нет токена");
            }

            const response = await fetch(`${BASE_URL}/api/v1/account/info`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const serverError = await response.json();
                return rejectWithValue(serverError);
            }

            const result = await response.json();
            return result;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthorized: (state, action) => {
            state.isAuthorized = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("tokenData");
            state.isAuthorized = false;
            state.userInfo = {
                companyLimit: 0,
                usedCompanyCount: 0,
            };
        },
        checkUserAuthorization: (state) => {
            const tokenData = localStorage.getItem("tokenData");
            if (tokenData) {
                const { accessToken, expire } = JSON.parse(tokenData);
                const expireDate = new Date(expire);
                if (accessToken && expireDate > new Date()) {
                    state.isAuthorized = true;
                } else {
                    state.isAuthorized = false;
                }
            } else {
                state.isAuthorized = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            localStorage.setItem("tokenData", JSON.stringify(action.payload));
            state.isAuthorized = true;
        })
        builder.addCase(getUserInfo.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload.eventFiltersInfo;
        })
        builder.addCase(getUserInfo.rejected, (state) => {
            state.isLoading = false;
        })
    },
});

export const { setAuthorized, checkUserAuthorization, logout } =
    userSlice.actions;
export default userSlice.reducer;
