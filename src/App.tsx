import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './components/firebase';
import { Category, Transaction } from './components/types';
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';
import { doc, deleteDoc, updateDoc} from "firebase/firestore";
import { CircularProgress, Box } from '@mui/material';




function App() {
  // Firestoreのエラーを判定する型ガード
  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    return typeof err === 'object' && err!== null && 'code' in err;

  }
  const[transactions,setTransactions] = useState<Transaction[]>([]);
  const[currentMonth, setCurrentMonth] = useState(new Date());
  const[isLoading,setIsLoading] = useState(true);
  format(currentMonth, 'yyyy-MM');

  useEffect(() => {
    
      const fetchTransactions = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "Transactions"));
          console.log("取得したデータ", querySnapshot);

          const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
          
        });

        setTransactions(transactionsData);
        } catch (err) {
          if (isFireStoreError(err)) {
            console.error(JSON.stringify(err, null, 2));
            console.error("Firestore エラー:", err.code, err.message);
          } else {
            console.error("一般的なエラー:", err);
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchTransactions();
  }, []);

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  })

  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      //保存
      const docRef = await addDoc(collection(db,"Transactions"), transaction);

      const newTransaction = {
        id: docRef.id, 
        ...transaction,
      } as Transaction;
      setTransactions(prevTransaction => [
        ...prevTransaction,
        newTransaction
      ]);

    }catch(err){
      if (isFireStoreError(err)) {
        console.error(JSON.stringify(err, null, 2));
        console.error("Firestore エラー:", err.code, err.message);
      } else {
        console.error("一般的なエラー:", err);
      }
    }
  }

  const handleDeleteTransaction = async(
    transactionId: string | readonly string[]
  ) => {
    try {
      const idsToDelete = Array.isArray(transactionId)
        ? transactionId
        : [transactionId];

      for (const id of idsToDelete) {
        //firestoreのデータ削除
        await deleteDoc(doc(db, "Transactions", id));
      }
      //複数の取引を削除可能
      const filterdTransactions = transactions.filter(
        (transaction) => !idsToDelete.includes(transaction.id)
      );
      setTransactions(filterdTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firestoreのエラーは：", err);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  const handleUpdateTransaction = async(transaction: Schema, transactionId: string) => {
    try {
      //Firestore更新
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction)
      const updatedTransactions: Transaction[] = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction, category: transaction.category as Category | undefined } : t
      );

    setTransactions(updatedTransactions);
    } catch(err){
      if (isFireStoreError(err)) {
        console.error(JSON.stringify(err, null, 2));
        console.error("Firestore エラー:", err.code, err.message);
      } else {
        console.error("一般的なエラー:", err);
      }
    }
  }

  console.log("月ごとのトランザクション", monthlyTransactions);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route
            index
            element={
              <Home
                monthlyTransactions={monthlyTransactions}
                setCurrentMonth={setCurrentMonth}
                onSaveTransaction={handleSaveTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                onUpdateTransaction={handleUpdateTransaction}
              />
            }
          />
          <Route path='/report' element={
            <Report
              monthlyTransactions={monthlyTransactions}
              setCurrentMonth={setCurrentMonth}
              currentMonth={currentMonth}
              isLoading={false}
              onDeleteTransaction={handleDeleteTransaction}
              />
            }
          />
          <Route path='*' element={<NoMatch />} />
        </Route>

      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
