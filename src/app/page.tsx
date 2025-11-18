'use client'

import { useState } from 'react'
import { QuizFlow } from './components/QuizFlow'
import { Dashboard } from './components/Dashboard'

export default function Home() {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  const handleQuizComplete = (data: any) => {
    setUserData(data)
    setQuizCompleted(true)
  }

  if (quizCompleted && userData) {
    return <Dashboard userData={userData} />
  }

  return <QuizFlow onComplete={handleQuizComplete} />
}
