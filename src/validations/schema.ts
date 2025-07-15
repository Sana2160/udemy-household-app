import { z } from "zod";

const categoryOptions = [
  "食費", "日用品", "住居費", "交際費", "娯楽費", "交通費",
  "給与", "副収入", "お小遣い"
] as const;

export type Category = typeof categoryOptions[number];

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "日付は必須です" }),
  amount: z.number().min(1, { message: "金額は1円以上必須です" }),
  content: z
    .string()
    .min(1, { message: "内容を入力してください" })
    .max(50, { message: "内容は50文字以内にしてください。" }),
  category: z
    .string()
    .refine((val): val is Category => {
      return categoryOptions.includes(val as Category);
    }, {
      message: "カテゴリを選択してください"
    }),
});

export type Schema = z.infer<typeof transactionSchema>;
