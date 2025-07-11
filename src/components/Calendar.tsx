import FullCalendar from '@fullcalendar/react'
import React, { use } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import { render } from '@testing-library/react'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import "../calendar.css"
import { calculateDailyBalances } from '../utils/financeCalculations'
import { Balance, CalenderContent, Transaction } from './types'
import { start } from 'repl'
import { formatCurrency } from '../utils/formatting'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useTheme } from '@mui/material'
import { isSameMonth } from 'date-fns'


interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string,
  today: string;
}


const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today,
}: CalendarProps) => {

  const theme = useTheme();

  const dailyBalances = calculateDailyBalances(monthlyTransactions);

  const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalenderContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      }
    })
  }

  const calendarEvents = createCalendarEvents(dailyBalances);
  console.log(calendarEvents);

  const backgroundEvents = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  };

  console.log([...calendarEvents, backgroundEvents]);

  const renderEventContent = (eventInfo: EventContentArg) => {
    console.log (eventInfo);
    return (
      <div>
        <div className='money' id='event-income'>
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id='event-expense'>
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id='event-balance'>
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  const handleDateSet = (dateSetInfo: DatesSetArg) => {
    const currentMonth = dateSetInfo.view.currentStart;
    setCurrentMonth(dateSetInfo.view.currentStart);
    const todayDate = new Date();
    if(isSameMonth(currentMonth, todayDate)){
      setCurrentDay(today);
    }
  }

  const handleDateClick =(dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  }

  return (
    <FullCalendar
      locale={jaLocale} 
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={[...calendarEvents, backgroundEvents]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar