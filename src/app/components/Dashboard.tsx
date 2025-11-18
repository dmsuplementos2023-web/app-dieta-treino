'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DietPlan } from './DietPlan'
import { WorkoutPlan } from './WorkoutPlan'
import { ProgressTracking } from './ProgressTracking'
import { Utensils, Dumbbell, TrendingUp, Sparkles } from 'lucide-react'

interface DashboardProps {
  userData: any
}

export function Dashboard({ userData }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('diet')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Seu Plano Personalizado</h1>
          </div>
          <p className="text-purple-100 text-lg">
            Bem-vindo à sua jornada de transformação! Tudo foi criado especialmente para você.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto h-auto p-1">
            <TabsTrigger value="diet" className="flex items-center gap-2 py-3">
              <Utensils className="w-4 h-4" />
              <span className="hidden sm:inline">Dieta</span>
            </TabsTrigger>
            <TabsTrigger value="workout" className="flex items-center gap-2 py-3">
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Treino</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2 py-3">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Progresso</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diet" className="space-y-6">
            <DietPlan userData={userData} />
          </TabsContent>

          <TabsContent value="workout" className="space-y-6">
            <WorkoutPlan userData={userData} />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressTracking userData={userData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
