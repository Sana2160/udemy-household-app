import { Box, Button } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ja } from "date-fns/locale";
import { addMonths } from 'date-fns';
import React from 'react';

interface MonthSelectorProps {
    currentMonth: Date
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const MonthSelector = ({currentMonth, setCurrentMonth}:MonthSelectorProps) => {

    const handleDateChange = (newDate:Date | null) => {
        if(newDate){
            setCurrentMonth(newDate)
        }
    }

    //先月ボタンの処理
    const handlePreviousMonth= () => {
        const previousMonth = addMonths(currentMonth, -1);
        setCurrentMonth(previousMonth)
    }
    //前月ボタンの処理
    const handleNextMonth= () => {
        const nextMonth = addMonths(currentMonth, 1);
        setCurrentMonth(nextMonth);
    }
  return (
    <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ja}
        dateFormats={{monthAndYear: 'yyyy年 MM月'}}
    >
        <Box sx={{display: 'flex', justifyContent: "center", alignItems: 'center' }}>
            <Button onClick={handlePreviousMonth} color={'error'} variant='contained'>
                先月
            </Button>
            <DatePicker
                onChange={handleDateChange}
                value={currentMonth}
                label='年月を選択'
                sx={{mx: 2, background: 'white'}}
                views={['year', 'month']}
                format='yyyy/MM'
                slotProps={{
                    toolbar:{
                        toolbarFormat: 'yyyy年MM月',
                    }
                }}
            />
            <Button
                onClick={handleNextMonth}
                color={'primary'}
                variant='contained'>
                次月
            </Button>
        </Box>
    </LocalizationProvider>
  )
}

export default MonthSelector