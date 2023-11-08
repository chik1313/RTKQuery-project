export type CardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: CardGradeType;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
};

export type FetchCardsResponseType = {
    cards: CardType[];
    packUserId: string;
    packName: string;
    packPrivate: boolean;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
    token: string;
    tokenDeathTime: number;
};

type CardGradeType = 0 | 1 | 2 | 3 | 4 | 5;

export type ArgCreateCardType = {
    cardsPack_id: string;
    question?: string;
    answer?: string;
    grade?: CardGradeType;
    shots?: number;
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
    answerVideo?: string;
};

export type AddCardResponseType = {
    newCard: CardType;
    token: string;
    tokenDeathTime: number;
};

export type ArgGetCardsType = {
    packId: string;
    page?: number;
    pageCount?: number;
};
export type DeleteCardResponseType = {
    deletedCard: CardType;
    token: string;
    tokenDeathTime: number;
};
