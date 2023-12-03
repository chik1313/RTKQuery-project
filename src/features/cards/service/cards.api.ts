import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseURL} from "../../../common/api/common.api";
import {
    AddCardResponseType, ArgCreateCardType,
    ArgGetCardsType, ArgUpdateCardType,
    DeleteCardResponseType,
    FetchCardsResponseType
} from "./types";

export const cardsApi = createApi({
    reducerPath: "cardsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: "include"
    }),
    tagTypes: ["Card"],
    endpoints: (build) => {
        return {
            getCards: build.query<FetchCardsResponseType, ArgGetCardsType>({
                query: ({packId,page,pageCount}) => {
                    return {
                        url: "cards/card",
                        params: {
                            cardsPack_id: packId,
                            page,
                            pageCount
                        },
                    };
                },
                providesTags: ['Card']
            }),
            addCard: build.mutation<AddCardResponseType, ArgCreateCardType>({
                query: (card) => {
                    return {
                        method: "POST",
                        url: "cards/card",
                        body: {
                            card
                        },
                    }
                }
            }),
            deleteCard: build.mutation<DeleteCardResponseType, string>({
                query: (id) => {
                    return {
                        method: "DELETE",
                        url: "cards/caлrd",
                        params: {
                            id,
                        },
                    };
                },
                invalidatesTags: ["Card"],
            }),
            updateCard: build.mutation<any, ArgUpdateCardType>({
                query: (card) => {
                    return {
                        method: "PUT",
                        url: "cards/card",
                        body: {
                            card,
                        },
                    };
                },
                invalidatesTags: ["Card"],
            }),
        };
    },
})

export const { useGetCardsQuery, useAddCardMutation, useDeleteCardMutation,useUpdateCardMutation} = cardsApi
