/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";
import { getAccessToken } from "../utils/supportFunctions";
import { SearchData } from "../interfaces/searchInterface";

interface IDsList {
    ids: string[];
}

interface IDItem {
    encodedId: string;
    influence: number;
    similarCount: number;
}

interface FormattedData {
    date: string;
    documentsCount: number;
    riskCount: number;
}

interface ItemData {
    date: string;
    value: number;
}

interface HistogramData {
    data: ItemData[];
    histogramType: string;
}

interface OverviewData {
    date: string;
    documentsCount: number;
    riskCount: number;
}

interface DataState {
    overviewData: OverviewData[];
    overviewIsLoading: boolean;
    ids: string[];
    articles: any[];
}

const initialState: DataState = {
    overviewData: [],
    overviewIsLoading: false,
    ids: [],
    articles: [],
};

export const fetchOverviewData = createAsyncThunk(
    "data/fetchOverviewData",
    async (data: SearchData, { rejectWithValue }) => {
        try {
            const accessToken = getAccessToken();
            if (accessToken === null) {
                return rejectWithValue("Нет токена");
            }
            const response = await fetch(
                `${BASE_URL}/api/v1/objectsearch/histograms`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                const serverError = await response.json();
                return rejectWithValue(serverError);
            }

            const result = await response.json();
            const formattedData: FormattedData[] = [];
            result.data.forEach((histogramData: HistogramData) => {
                histogramData.data.forEach((item: ItemData) => {
                    const existingEntry = formattedData.find(
                        (entry) => entry.date === item.date
                    );
                    if (existingEntry) {
                        if (histogramData.histogramType === "totalDocuments") {
                            existingEntry.documentsCount = item.value; //Как альтернатива - можно сложить значения '+='
                        } else if (histogramData.histogramType === "riskFactors") {
                            existingEntry.riskCount = item.value; //Как альтернатива - можно сложить значения '+='
                        }
                    } else {
                        formattedData.push({
                            date: item.date,
                            //На случай если в данных нет значения (для пользователя предполагается отображение цифры, а не пустого значения или null/undefined)
                            documentsCount:
                                histogramData.histogramType === "totalDocuments"
                                    ? item.value
                                    : 0,
                            riskCount:
                                histogramData.histogramType === "riskFactors" ? item.value : 0,
                        });
                    }
                });
            });
            return formattedData;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchDocumentsIds = createAsyncThunk(
    "data/fetchDocumentsIds",
    async (data: SearchData, { rejectWithValue }) => {
        try {
            const accessToken = getAccessToken();
            if (accessToken === null) {
                return rejectWithValue("Нет токена");
            }
            const response = await fetch(`${BASE_URL}/api/v1/objectsearch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const serverError = await response.json();
                return rejectWithValue(serverError);
            }

            const result = await response.json();
            const iDsList = result.items.map((item: IDItem) => item.encodedId);
            return iDsList;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchArticles = createAsyncThunk(
    "data/fetchArticles",
    async (data: IDsList, { rejectWithValue }) => {
        try {
            const accessToken = getAccessToken();
            if (accessToken === null) {
                return rejectWithValue("Нет токена");
            }
            const response = await fetch(`${BASE_URL}/api/v1/documents`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const serverError = await response.json();
                return rejectWithValue(serverError);
            }

            const result = await response.json();
            const articles = result.map((item: any) => item.ok);
            const formattedArticles = articles.map((article: any) => {
                return {
                    attributes: {
                        isDigest: article.attributes.isDigest,
                        isTechNews: article.attributes.isTechNews,
                        isAnnouncement: article.attributes.isAnnouncement,
                        wordCount: article.attributes.wordCount,
                    },
                    title: article.title.text,
                    text: article.content.markup,
                    date: article.issueDate,
                    source: article.source.name,
                    url: article.url,
                };
            });

            return formattedArticles;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.overviewData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOverviewData.fulfilled, (state, action) => {
                state.overviewData = action.payload;
                state.overviewIsLoading = false;
            })
            .addCase(fetchOverviewData.rejected, (state) => {
                state.overviewIsLoading = false;
            })
            .addCase(fetchOverviewData.pending, (state) => {
                state.overviewIsLoading = true;
            })
            .addCase(fetchDocumentsIds.fulfilled, (state, action) => {
                state.ids = action.payload;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.articles = [...state.articles, ...action.payload];
            });
    },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
