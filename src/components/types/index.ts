export type TransactionType = "income" | "expense";
export type inComeCategory = "給与" | "副収入" | "お小遣い";
export type ExpenceCategory = "食費" | "日用品" | "住居費" | "交際費" | "娯楽費" | "交通費" ;
export type Category = inComeCategory | ExpenceCategory | "";

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    content: string;
    type: TransactionType;
    category: Category | undefined;
}


export interface Balance {
    income: number,
    expense: number,
    balance: number,
}

//createEventsの引数の型
export interface CalenderContent {
    start: string,
    income: string,
    expense: string,
    balance: string,
}

//