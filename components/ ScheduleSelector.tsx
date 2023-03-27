import React, { useState, useEffect, useMemo } from 'react'

interface ScheduleSelectorProps {
  onDateSelected: (date: Date) => void
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({ onDateSelected }) => {
  const currentDate = useMemo(() => new Date(), [])
  const tomorrow = useMemo(() => new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), [currentDate])
  const [month, setMonth] = useState(tomorrow.getMonth())
  const [day, setDay] = useState(tomorrow.getDate())
  const [year, setYear] = useState(tomorrow.getFullYear())
  const [hours, setHours] = useState(9)
  const [minutes, setMinutes] = useState(0)
  const [error, setError] = useState('')

  const timeZone = useMemo(() => new Intl.DateTimeFormat().resolvedOptions().timeZone, [])

  useEffect(() => {
    const selectedDate = new Date(year, month, day, hours, minutes)
    if (selectedDate < currentDate) {
      setError('Cannot select a date in the past.')
    } else {
      setError('')
      onDateSelected(selectedDate)
    }
  }, [month, day, year, hours, minutes, currentDate, onDateSelected])

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const generateOptions = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => (
      <option key={i} value={i + start}>
        {i + start}
      </option>
    ))
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block">Month</label>
          <select
            className="block w-full mt-1 text-white bg-black"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          >
            <option key={0} value={0}>
              January
            </option>
            <option key={1} value={1}>
              February
            </option>
            <option key={2} value={2}>
              March
            </option>
            <option key={3} value={3}>
              April
            </option>
            <option key={4} value={4}>
              May
            </option>
            <option key={5} value={5}>
              June
            </option>
            <option key={6} value={6}>
              July
            </option>
            <option key={7} value={7}>
              August
            </option>
            <option key={8} value={8}>
              September
            </option>
            <option key={9} value={9}>
              October
            </option>
            <option key={10} value={10}>
              November
            </option>
            <option key={11} value={11}>
              December
            </option>
          </select>
        </div>
        <div>
          <label className="block">Day</label>
          <select
            className="block w-full mt-1 text-white bg-black"
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value))}
          >
            {generateOptions(1, daysInMonth(month, year))}
          </select>
        </div>
        <div>
          <label className="block">Year</label>
          <select
            className="block w-full mt-1 text-white bg-black"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          >
            {generateOptions(currentDate.getFullYear(), currentDate.getFullYear() + 10)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block">Hours</label>
          <select
            className="block w-full mt-1 text-white bg-black"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
          >
            {generateOptions(0, 23)}
          </select>
        </div>
        <div>
          <label className="block">Minutes</label>
          <select
            className="block w-full mt-1 text-white bg-black"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
          >
            {generateOptions(0, 59)}
          </select>
        </div>
      </div>
      <strong>Time zone:</strong> {timeZone}
      {error && <div className="col-span-2 text-red-500">{error}</div>}
    </div>
  )
}

export default ScheduleSelector
