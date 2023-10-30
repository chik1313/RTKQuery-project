import {useParams} from "react-router-dom";
import {useAddCardMutation, useGetCardsQuery} from "../../service/cards.api";
import LinearProgress from "@mui/material/LinearProgress";
import {nanoid} from "@reduxjs/toolkit";
import {ArgCreateCardType} from "../../service/types";
import {toast} from "react-toastify";
import {ChangeEvent} from "react";
import {Pagination} from "@mui/material";
import s from "./styles.module.css"

export const Cards = () => {
    let {packId} = useParams<{ packId: string }>();

    const {data, isLoading, isError, error, refetch} = useGetCardsQuery(packId ?? "");

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
                .unwrap()
                .then((res) => {
                    const cardQuestion = res.newCard.question;
                    toast.success(`Карточка ${cardQuestion} успешно добавлена`);
                })
                .catch((err)=> {
                    toast.error(err.data.error)
                })
        }
    }

    const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
        console.log("page: ", page);
    };

    return (
        <div>
            <h1>Cards</h1>
            <button onClick={addCardHandler}>add card</button>
            <button onClick={refetch}>get new data</button>
            <div>
                {
                    data?.cards.map((card) => {
                        return (
                            <div className={s.container} key={card._id}>
                                <div>
                                    <b>Question: </b>
                                    <p>{card.question}</p>{" "}
                                </div>
                                <div>
                                    <b>Answer: </b>
                                    <p>{card.answer}</p>{" "}
                                </div>
                            </div>
                        );
                    })}
            </div>
            <Pagination count={data?.cardsTotalCount} onChange={changePageHandler} />
        </div>
    );
};
