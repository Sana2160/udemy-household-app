import { Card, CardContent, Stack, Typography, Grid } from '@mui/material';
import React from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { blue } from '@mui/material/colors';
import { Padding } from '@mui/icons-material';
import { theme } from '../theme/theme';
import { Transaction } from './types';
import { financeCalculations } from '../utils/financeCalculations';

interface MonthlySummaryProps {
  monthlyTransactions: Transaction[],
}

const MonthlySummary = ({monthlyTransactions}: MonthlySummaryProps) => {
    console.log(monthlyTransactions)

    const {income, expense, balance} = financeCalculations(monthlyTransactions);

  return (
    <Grid container spacing={{xs: 1, sm: 2}} mb={2}>
        {/* 収入カード */}
        <Grid item xs={4} display={"flex"} flexDirection={"column"}>
            <Card sx={{
                bgcolor: (theme) => theme.palette.incomeColor.main,
                color: "white",
                borderRadius: "10px",
                flexGrow: 1, // カードの高さを揃えるために追加
                }}>
                <CardContent sx={{padding: {xs:1, sm:2}}}>
                    <Stack direction={"row"}>
                        <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
                        <Typography>収入</Typography>
                    </Stack>
                    <Typography
                    textAlign={"right"}
                    variant='h5'
                    fontWeight={"fontWeightBold"}
                    sx={{ wordBreak: "break-word", fontSize: {xs:".8rem", sm: "1rem", md: "1.2rem"}}}
                    >￥{income}</Typography>
                </CardContent>
            </Card>
        </Grid>

        {/* 支出カード */}
        <Grid item xs={4} display={"flex"} flexDirection={"column"}>
            <Card sx={{
                bgcolor: (theme) => theme.palette.expenseColor.main,
                color: "white",
                borderRadius: "10px",
                flexGrow: 1,
                }}>
                <CardContent sx={{padding: {xs:1, sm:2}}}>
                    <Stack direction={"row"}>
                        <ArrowDownwardIcon sx={{ fontSize: "2rem" }} />
                        <Typography>支出</Typography>
                    </Stack>
                    <Typography
                    textAlign={"right"}
                    variant='h5'
                    fontWeight={"fontWeightBold"}
                    sx={{ wordBreak: "break-word", fontSize: {xs:".8rem", sm: "1rem", md: "1.2rem"}}}
                    >￥{expense}</Typography>
                </CardContent>
            </Card>
        </Grid>

        {/* 残高カード */}
        <Grid item xs={4} display={"flex"} flexDirection={"column"}>
            <Card sx={{
                bgcolor: (theme) => theme.palette.balanceColor.main,
                color: "white",
                borderRadius: "10px",
                flexGrow: 1,
                }}>
                <CardContent sx={{padding: {xs:1, sm:2}}}>
                    <Stack direction={"row"}>
                        <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
                        <Typography>残高</Typography>
                    </Stack>
                    <Typography
                    textAlign={"right"}
                    variant='h5'
                    fontWeight={"fontWeightBold"}
                    sx={{ wordBreak: "break-word", fontSize: {xs:".8rem", sm: "1rem", md: "1.2rem"}}}
                    >￥{balance}</Typography>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
};

export default MonthlySummary;