import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseURL} from "../../../common/api/common.api";
import {AddCardResponseType, ArgCreateCardType, FetchCardsResponseType} from "./types";

export const cardsApi = createApi({
    reducerPath: "cardsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: "include"
    }),
    tagTypes: ["Card"],
    endpoints: (build) => {
        return {
            getCards: build.query<FetchCardsResponseType, string>({
                query: (packId) => {
                    return {
                        url: "cards/card",
                        params: {
                            cardsPack_id: packId,
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
            })
        };
    },
})

export const { useGetCardsQuery, useAddCardMutation} = cardsApi
