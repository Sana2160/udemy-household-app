export type TransactionType = "income" | "expense";
export type inComeCategory = "給与" | "副収入" | "お小遣い";
export type ExpenceCategory = "食費" | "日用品" | "住居費" | "交際費" | "通信費" | "娯楽費";


export interface Transaction {
    id: string,
    date: string,
    amount: number,
    content: string,
    type: TransactionType,
    category: inComeCategory | ExpenceCategory,
}