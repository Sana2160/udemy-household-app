import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import { render } from '@testing-library/react'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import "../calendar.css"
import { calculateDailyBalances } from '../utils/financeCalculations'
import { Balance, CalenderContent, Transaction } from './types'
import { start } from 'repl'
import { formatCurrency } from '../utils/formatting'


interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const Calendar = ({monthlyTransactions, setCurrentMonth}: CalendarProps) => {
  const events = [
  { title: 'Meeting', start: "2025-07-10" },
  { title: 'Meetingg', start: "2025-07-11", income: 300 },
  ]

  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalances);

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
  console.log(calendarEvents + "カレンダーイベント");

  console.log(dailyBalances)

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
    console.log(dateSetInfo);
    setCurrentMonth(dateSetInfo.view.currentStart);
  }

  return (
    <FullCalendar
      locale={jaLocale} 
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
    />
  )
}

export default Calendar