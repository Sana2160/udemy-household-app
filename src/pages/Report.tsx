import { Grid, Paper } from '@mui/material'
import MonthSelector from '../components/MonthSelector'
import CategoryChart from '../components/CategoryChart'
import BarChart from '../components/BarChart'
import TransactionTable from '../components/TransactionTable'
import { Transaction } from '../components/types'

interface ReportProps {
  monthlyTransactions: Transaction[];
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  isLoading: boolean;
  onDeleteTransaction: (transactionId: string | readonly string[]) => Promise<void>
}

const Report = ({
  monthlyTransactions,
  currentMonth,
  setCurrentMonth,
  isLoading,
  onDeleteTransaction,
}: ReportProps) => {
  const commonPaperStyle = {
    height: {xs: "auto", md: "400px"},
    display: "flex",
    flexDirection: "column",
    p: 2,
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* 日付選択 */}
        <MonthSelector
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonPaperStyle}>
          {/* 円グラフ */}
          <CategoryChart
            monthlyTransactions={monthlyTransactions}
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}>
          {/* 棒グラフ */}
          <BarChart
            monthlyTransactions={monthlyTransactions}
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {/* テーブル */}
        <TransactionTable 
          monthlyTransactions={monthlyTransactions}
          onDeleteTransaction={onDeleteTransaction}
        />
      </Grid>
    </Grid>
    
  )
}

export default Report