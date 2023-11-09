import {useParams} from "react-router-dom";
import {
    useAddCardMutation,
    useDeleteCardMutation,
    useGetCardsQuery,
    useUpdateCardMutation
} from "../../service/cards.api";
import LinearProgress from "@mui/material/LinearProgress";
import {nanoid} from "@reduxjs/toolkit";
import {ArgCreateCardType, CardType} from "../../service/types";
import {toast} from "react-toastify";
import {ChangeEvent, useState} from "react";
import {Pagination} from "@mui/material";
import s from "./styles.module.css"

export const Cards = () => {
    let {packId} = useParams<{ packId: string }>();
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(3)
    const {data, isLoading, isError, error, refetch} = useGetCardsQuery({packId: packId ?? "", page, pageCount});
    const [addCard] = useAddCardMutation()
    const [deleteCard, {isLoading: isDeletedLoading}] = useDeleteCardMutation()
    const [updateCard, {data: updatedCard}] = useUpdateCardMutation()

    if (isLoading || isDeletedLoading) return <LinearProgress color={"secondary"}/>

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
                .catch((err) => {
                    toast.error(err.data.error)
                })
        }
    }

    const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
        setPage(page)
    };
    const deletedCardHandler = (cardId: string) => {
        deleteCard(cardId)
    }
    const updateCardHandler = (card: CardType) => {
        const newCard = { ...card, question: "💚 new question 💚", answer: "🧡 new answer🧡 " };
        updateCard(newCard);
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
                                <button onClick={() => deletedCardHandler(card._id)}>delete card</button>
                                <button onClick={() => updateCardHandler(card)}>update card</button>
                            </div>
                        );
                    })}
            </div>
            <Pagination count={data?.cardsTotalCount} onChange={changePageHandler} page={page}/>
        </div>
    );
};
