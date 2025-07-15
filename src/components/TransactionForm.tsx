import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { JSX, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import SavingsIcon from "@mui/icons-material/Savings";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { ExpenceCategory, inComeCategory, Transaction } from "./types";
import {zodResolver} from "@hookform/resolvers/zod";
import { Schema, transactionSchema } from "../validations/schema";
import { Category } from "@mui/icons-material";

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  onDeleteTransaction: (transactionId: string) => Promise<void>;
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>;
}



type incomeExpense = "income" | "expense";
interface CategoryItem {
  label: inComeCategory | ExpenceCategory;
  icon: JSX.Element;
}

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
  onSaveTransaction,
  selectedTransaction,
  setSelectedTransaction,
  onDeleteTransaction,
  onUpdateTransaction,
}: TransactionFormProps) => {
  const formWidth = 320;

  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <AddHomeIcon fontSize="small" /> },
    { label: "住居費", icon: <AddBusinessIcon fontSize="small" /> },
    { label: "交際費", icon: <Diversity3Icon fontSize="small" /> },
    { label: "娯楽費", icon: <SportsTennisIcon fontSize="small" /> },
    { label: "交通費", icon: <TrainIcon fontSize="small" /> },
  ];

  const incomeCategories: CategoryItem[] = [
    { label: "給与", icon: <WorkIcon fontSize="small" /> },
    { label: "副収入", icon: <SavingsIcon fontSize="small" /> },
    { label: "お小遣い", icon: <AlarmIcon fontSize="small" /> },
  ];

  const [categories, setCategories] = useState(expenseCategories);

  const{
    control,
    setValue, watch,
    formState:{errors},
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      type: "expense", // 初期値を支出に設定
      date: currentDay, // 今日の日付を初期値に設定
      amount: 0,
      category: undefined, // 初期値をundefinedに設定
      content: "",
    },
    resolver: zodResolver(transactionSchema),
  });
  console.log(errors);

  const incomeExpenseToggle = (type: incomeExpense) => {
    setValue("type", type);
    setValue("category", undefined)
  }

  const currentType = watch("type");

  useEffect(() => {
    const newCategories =
      currentType === "expense" ? expenseCategories : incomeCategories;
    setCategories(newCategories);
  }, [currentType]);

  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);

  //送信
  const onSubmit: SubmitHandler<Schema> = (data) => {
    console.log(data);
    if(selectedTransaction) {
      onUpdateTransaction(data, selectedTransaction.id)
      .then(() => {
        //console.log("更新しました")
        setSelectedTransaction(null);
      })
      .catch((error) => {
        console.error(error)
      })
    } else {
      onSaveTransaction(data)
      .then(() => {
        console.log("保存しました")
      })
      .catch((error) => {
        console.error(error)
      })
    }


    reset({
      type: "expense",
      date: currentDay,
      amount: 0,
      category: undefined, // 初期値をundefinedに設定
      content: "",
    })
  };

  useEffect(() => {
    if (selectedTransaction) {
      const categoryExists = categories.some(
        (category) => category.label === selectedTransaction.category
      );

      if (categoryExists) {
        setValue("category", selectedTransaction.category as Schema["category"]);
      } else {
        setValue("category", undefined); // 空文字をセット
      }
    }
  }, [selectedTransaction, categories, setValue]);



  useEffect(() => {
  if (selectedTransaction) {
    setValue("type", selectedTransaction.type);
    setValue("date", selectedTransaction.date);
    setValue("amount", selectedTransaction.amount);

    

    setValue("content", selectedTransaction.content);
  } else{
    reset({
      type: "expense",
      date: currentDay, 
      amount: 0,
      category: undefined,
      content: "",
    })
  }
}, [selectedTransaction, setValue]);

  const handleDelete = () => {
    if(selectedTransaction){
      onDeleteTransaction(selectedTransaction.id);
      setSelectedTransaction(null);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth: "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller 
            name="type"
            control={control}
            render={({field}) => {
              return(
              <ButtonGroup fullWidth>
                <Button 
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error"
                  onClick={() => incomeExpenseToggle("expense")}
                >
                  支出
                </Button>
                <Button
                  onClick={() => incomeExpenseToggle("income")}
                  color={"primary"}
                  variant={
                    field.value === "income" ? "contained" : "outlined"
                  }
                >
                  収入</Button>
              </ButtonGroup>
              );
            }}
          />
          
          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({field}) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({field}) => (
              <TextField 
                error={!!errors.category}
                helperText={errors.category?.message}
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
              >
                <MenuItem value={undefined}><em>カテゴリを選択してください</em></MenuItem>
                {categories.map((category, index) => (
                  <MenuItem value={category.label} key={index}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
                
              </TextField>
            )}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.amount}
                helperText={errors.amount?.message}
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
              />
            )}
          />
          
          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({field}) => (
              <TextField 
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field} label="内容" type="text" />
            )}
          />

          {/* 保存ボタン */}
          <Button
            type="submit" 
            variant="contained" 
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            {selectedTransaction ? "更新" : "保存"}
          </Button>

            {/* 削除ボタン */}
            {selectedTransaction &&(
              <Button
                onClick={handleDelete} 
                variant="outlined" 
                color={"secondary"}
                fullWidth
              >
            削除
          </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
