import { Card, CardContent, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { blue } from '@mui/material/colors';

const MonthlySummary = () => {
  return (
    <Grid container>
        <Grid size={{ xs: 12 }}>
            <Card sx={{ bgcolor: "blue" , color: "white", borderRadius: "10px"}}>
                <CardContent>
                    <Stack direction={"row"}>
                        <ArrowUpwardIcon />
                        <Typography>収入</Typography>
                    </Stack>
                    <Typography>￥300</Typography>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
};

export default MonthlySummary;