'use client'

import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 3)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date()
      const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })

      if (timeDifference === 0) {
        clearInterval(timerInterval)
        // You can add code here to handle what happens when the target date is reached.
      }
    }, 1000)

    return () => {
      clearInterval(timerInterval) // Cleanup the interval when the component unmounts.
    }
  }, [])

  return (
    <section className={classes.promotion}>
      <div className={classes.statBox}>
        <h3 className={classes.title}>সপ্তাহের সেরা ডিল সমূহ</h3>
        <p>
          ঢাকা থেকে রাজশাহী যেতে চাচ্ছি আম খেতে এবং পরিবারের জন্য আনতে। শুধুমাত্র নিজেদের জন্যেই
          আনবো, ব্যাবসায়ীক কোনো পরিকল্পনা নাই।। অভিজ্ঞ দের কাছে জানতে চাচ্ছি ঢাকা থেকে কিভাবে যাবো
          এবং ঠিক কোথায় গেলে একটু ভালো মানের আম তুলনামূলক কম দামে পাওয়া যাবে।?? ধন্যবাদ।
        </p>

        <ul className={classes.stats}>
          <StatBox label="দিন" value={time.days} />
          <StatBox label="ঘন্টা" value={time.hours} />
          <StatBox label="মিনিট" value={time.minutes} />
          <StatBox label="সেকেন্ড" value={time.seconds} />
        </ul>
      </div>
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

export default Promotion
