import {useParams} from "react-router-dom";
import {useAddCardMutation, useGetCardsQuery} from "../../service/cards.api";
import LinearProgress from "@mui/material/LinearProgress";
import {nanoid} from "@reduxjs/toolkit";
import {ArgCreateCardType} from "../../service/types";

export const Cards = () => {
    let {packId} = useParams<{ packId: string }>();

    const {data, isLoading, isError, error} = useGetCardsQuery(packId ?? "");

    const [addCard] = useAddCardMutation()

    if (isLoading) return <LinearProgress color={"secondary"}/>

    if (isError) {
        const err = error as any
        return <h1>{err.data.error}</h1>
    }
    const addCardHandler = () => {
        if (packId) {
            const newCard: ArgCreateCardType = {
                cardsPack_id: packId,
                question: "🐱 question " + nanoid(),
                answer: "🐙 answer " + nanoid(),
            };
            addCard(newCard)
        }
    }

    return (
        <div>
            <h1>Cards</h1>
            <button onClick={addCardHandler}>add cards</button>
            {data?.cards.map((c, i) => {
                return (
                    <div key={i}>
                        {c.question}
                    </div>
                )
            })}
        </div>
    );
};
