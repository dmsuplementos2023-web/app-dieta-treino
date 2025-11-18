'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Dumbbell, Calendar, Info, RefreshCw, Target, Zap, Clock } from 'lucide-react'

interface WorkoutPlanProps {
  userData: any
}

interface Exercise {
  name: string
  sets: string
  reps: string
  rest: string
  notes?: string
}

interface WorkoutDay {
  day: string
  focus: string
  exercises: Exercise[]
  duration: string
}

export function WorkoutPlan({ userData }: WorkoutPlanProps) {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([])
  const [weeksUntilUpdate, setWeeksUntilUpdate] = useState(8)

  useEffect(() => {
    generateWorkoutPlan()
  }, [userData])

  const generateWorkoutPlan = () => {
    const days = parseInt(userData.daysAvailable)
    const location = userData.workoutLocation
    const goal = userData.goal
    const gender = userData.gender
    const experience = userData.workoutHistory

    let plan: WorkoutDay[] = []

    // Plano para 5 dias - Foco Glúteo (exemplo do documento)
    if (days === 5 && gender === 'feminino') {
      plan = [
        {
          day: 'Segunda-feira',
          focus: 'Glúteos e Posteriores',
          duration: '60-75 min',
          exercises: [
            { name: 'Agachamento Livre', sets: '4', reps: '8-12', rest: '90s', notes: 'Foco na profundidade' },
            { name: 'Stiff', sets: '4', reps: '10-12', rest: '90s', notes: 'Controle na descida' },
            { name: 'Cadeira Abdutora', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Elevação Pélvica', sets: '4', reps: '12-15', rest: '60s', notes: 'Pausa de 2s no topo' },
            { name: 'Cadeira Flexora', sets: '3', reps: '12-15', rest: '60s' },
          ],
        },
        {
          day: 'Terça-feira',
          focus: 'Superiores (Peito, Ombro, Tríceps)',
          duration: '50-60 min',
          exercises: [
            { name: 'Supino Reto', sets: '4', reps: '8-12', rest: '90s' },
            { name: 'Desenvolvimento com Halteres', sets: '3', reps: '10-12', rest: '75s' },
            { name: 'Crucifixo Inclinado', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Elevação Lateral', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Tríceps Testa', sets: '3', reps: '12-15', rest: '60s' },
          ],
        },
        {
          day: 'Quarta-feira',
          focus: 'Glúteos e Quadríceps',
          duration: '60-75 min',
          exercises: [
            { name: 'Agachamento Sumô', sets: '4', reps: '10-12', rest: '90s', notes: 'Pés mais afastados' },
            { name: 'Leg Press 45°', sets: '4', reps: '12-15', rest: '90s', notes: 'Pés na parte superior' },
            { name: 'Avanço com Halteres', sets: '3', reps: '10-12 cada', rest: '75s' },
            { name: 'Cadeira Extensora', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Glúteo no Cross', sets: '3', reps: '15-20 cada', rest: '45s' },
          ],
        },
        {
          day: 'Quinta-feira',
          focus: 'Costas e Bíceps',
          duration: '50-60 min',
          exercises: [
            { name: 'Puxada Frontal', sets: '4', reps: '10-12', rest: '90s' },
            { name: 'Remada Curvada', sets: '4', reps: '10-12', rest: '90s' },
            { name: 'Remada Cavalinho', sets: '3', reps: '12-15', rest: '75s' },
            { name: 'Rosca Direta', sets: '3', reps: '10-12', rest: '60s' },
            { name: 'Rosca Martelo', sets: '3', reps: '12-15', rest: '60s' },
          ],
        },
        {
          day: 'Sexta-feira',
          focus: 'Glúteos e Posteriores (Intenso)',
          duration: '60-75 min',
          exercises: [
            { name: 'Agachamento Búlgaro', sets: '4', reps: '10-12 cada', rest: '90s', notes: 'Foco no glúteo' },
            { name: 'Mesa Flexora', sets: '4', reps: '10-12', rest: '90s' },
            { name: 'Hip Thrust', sets: '4', reps: '12-15', rest: '75s', notes: 'Carga progressiva' },
            { name: 'Cadeira Abdutora', sets: '4', reps: '15-20', rest: '60s', notes: 'Drop set na última' },
            { name: 'Panturrilha em Pé', sets: '4', reps: '15-20', rest: '60s' },
          ],
        },
      ]
    }
    // Plano para 4 dias - Upper/Lower
    else if (days === 4) {
      plan = [
        {
          day: 'Segunda-feira',
          focus: 'Superiores A',
          duration: '50-60 min',
          exercises: [
            { name: location === 'casa' ? 'Flexão de Braço' : 'Supino Reto', sets: '4', reps: '8-12', rest: '90s' },
            { name: location === 'casa' ? 'Remada Invertida' : 'Puxada Frontal', sets: '4', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Flexão Diamante' : 'Desenvolvimento', sets: '3', reps: '10-12', rest: '75s' },
            { name: location === 'casa' ? 'Rosca com Elástico' : 'Rosca Direta', sets: '3', reps: '12-15', rest: '60s' },
            { name: location === 'casa' ? 'Tríceps no Banco' : 'Tríceps Pulley', sets: '3', reps: '12-15', rest: '60s' },
          ],
        },
        {
          day: 'Terça-feira',
          focus: 'Inferiores A',
          duration: '60-75 min',
          exercises: [
            { name: location === 'casa' ? 'Agachamento Livre' : 'Agachamento Livre', sets: '4', reps: '8-12', rest: '2min' },
            { name: location === 'casa' ? 'Stiff com Halteres' : 'Stiff', sets: '4', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Avanço' : 'Leg Press', sets: '3', reps: '12-15', rest: '90s' },
            { name: location === 'casa' ? 'Elevação Pélvica' : 'Cadeira Extensora', sets: '3', reps: '12-15', rest: '60s' },
            { name: location === 'casa' ? 'Panturrilha no Step' : 'Panturrilha em Pé', sets: '4', reps: '15-20', rest: '60s' },
          ],
        },
        {
          day: 'Quinta-feira',
          focus: 'Superiores B',
          duration: '50-60 min',
          exercises: [
            { name: location === 'casa' ? 'Flexão Inclinada' : 'Supino Inclinado', sets: '4', reps: '8-12', rest: '90s' },
            { name: location === 'casa' ? 'Remada com Halteres' : 'Remada Curvada', sets: '4', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Elevação Lateral com Garrafas' : 'Elevação Lateral', sets: '3', reps: '12-15', rest: '60s' },
            { name: location === 'casa' ? 'Rosca Alternada' : 'Rosca Martelo', sets: '3', reps: '12-15', rest: '60s' },
            { name: location === 'casa' ? 'Mergulho no Banco' : 'Tríceps Francês', sets: '3', reps: '12-15', rest: '60s' },
          ],
        },
        {
          day: 'Sexta-feira',
          focus: 'Inferiores B',
          duration: '60-75 min',
          exercises: [
            { name: location === 'casa' ? 'Agachamento Sumô' : 'Agachamento Sumô', sets: '4', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Avanço Búlgaro' : 'Agachamento Búlgaro', sets: '3', reps: '10-12 cada', rest: '90s' },
            { name: location === 'casa' ? 'Elevação Pélvica Unilateral' : 'Hip Thrust', sets: '4', reps: '12-15', rest: '75s' },
            { name: location === 'casa' ? 'Cadeira Romana' : 'Mesa Flexora', sets: '3', reps: '12-15', rest: '60s' },
            { name: location === 'casa' ? 'Abdução com Elástico' : 'Cadeira Abdutora', sets: '3', reps: '15-20', rest: '60s' },
          ],
        },
      ]
    }
    // Plano para 3 dias - Full Body
    else if (days === 3) {
      plan = [
        {
          day: 'Segunda-feira',
          focus: 'Corpo Inteiro A',
          duration: '60-70 min',
          exercises: [
            { name: location === 'casa' ? 'Agachamento Livre' : 'Agachamento Livre', sets: '4', reps: '8-12', rest: '2min' },
            { name: location === 'casa' ? 'Flexão de Braço' : 'Supino Reto', sets: '3', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Remada com Halteres' : 'Puxada Frontal', sets: '3', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Desenvolvimento com Halteres' : 'Desenvolvimento', sets: '3', reps: '10-12', rest: '75s' },
            { name: location === 'casa' ? 'Stiff' : 'Stiff', sets: '3', reps: '12-15', rest: '90s' },
          ],
        },
        {
          day: 'Quarta-feira',
          focus: 'Corpo Inteiro B',
          duration: '60-70 min',
          exercises: [
            { name: location === 'casa' ? 'Avanço' : 'Leg Press', sets: '4', reps: '12-15', rest: '90s' },
            { name: location === 'casa' ? 'Flexão Inclinada' : 'Supino Inclinado', sets: '3', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Remada Invertida' : 'Remada Curvada', sets: '3', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Elevação Lateral' : 'Elevação Lateral', sets: '3', reps: '12-15', rest: '60s' },
            { name: location === 'casa' ? 'Elevação Pélvica' : 'Hip Thrust', sets: '3', reps: '12-15', rest: '75s' },
          ],
        },
        {
          day: 'Sexta-feira',
          focus: 'Corpo Inteiro C',
          duration: '60-70 min',
          exercises: [
            { name: location === 'casa' ? 'Agachamento Sumô' : 'Agachamento Sumô', sets: '4', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Flexão Diamante' : 'Supino Fechado', sets: '3', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Puxada com Elástico' : 'Puxada Aberta', sets: '3', reps: '10-12', rest: '90s' },
            { name: location === 'casa' ? 'Rosca com Halteres' : 'Rosca Direta', sets: '3', reps: '12-15', rest: '60s' },
            { name: location === 'casa' ? 'Mesa Flexora Caseira' : 'Mesa Flexora', sets: '3', reps: '12-15', rest: '60s' },
          ],
        },
      ]
    }
    // Plano para 6 dias - Push/Pull/Legs
    else if (days === 6) {
      plan = [
        {
          day: 'Segunda-feira',
          focus: 'Push (Peito, Ombro, Tríceps)',
          duration: '60-70 min',
          exercises: [
            { name: 'Supino Reto', sets: '4', reps: '8-12', rest: '90s' },
            { name: 'Supino Inclinado', sets: '3', reps: '10-12', rest: '90s' },
            { name: 'Desenvolvimento', sets: '4', reps: '10-12', rest: '90s' },
            { name: 'Elevação Lateral', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Tríceps Pulley', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Tríceps Francês', sets: '3', reps: '12-15', rest: '60s' },
          ],
        },
        {
          day: 'Terça-feira',
          focus: 'Pull (Costas e Bíceps)',
          duration: '60-70 min',
          exercises: [
            { name: 'Puxada Frontal', sets: '4', reps: '10-12', rest: '90s' },
            { name: 'Remada Curvada', sets: '4', reps: '10-12', rest: '90s' },
            { name: 'Remada Cavalinho', sets: '3', reps: '12-15', rest: '75s' },
            { name: 'Pullover', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Rosca Direta', sets: '3', reps: '10-12', rest: '60s' },
            { name: 'Rosca Martelo', sets: '3', reps: '12-15', rest: '60s' },
          ],
        },
        {
          day: 'Quarta-feira',
          focus: 'Legs (Pernas Completo)',
          duration: '70-80 min',
          exercises: [
            { name: 'Agachamento Livre', sets: '4', reps: '8-12', rest: '2min' },
            { name: 'Leg Press', sets: '4', reps: '12-15', rest: '90s' },
            { name: 'Stiff', sets: '4', reps: '10-12', rest: '90s' },
            { name: 'Cadeira Extensora', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Mesa Flexora', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Panturrilha em Pé', sets: '4', reps: '15-20', rest: '60s' },
          ],
        },
        {
          day: 'Quinta-feira',
          focus: 'Push (Peito, Ombro, Tríceps)',
          duration: '60-70 min',
          exercises: [
            { name: 'Supino Inclinado com Halteres', sets: '4', reps: '8-12', rest: '90s' },
            { name: 'Crucifixo Reto', sets: '3', reps: '12-15', rest: '75s' },
            { name: 'Desenvolvimento com Halteres', sets: '4', reps: '10-12', rest: '90s' },
            { name: 'Elevação Frontal', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Tríceps Testa', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Tríceps Corda', sets: '3', reps: '12-15', rest: '60s' },
          ],
        },
        {
          day: 'Sexta-feira',
          focus: 'Pull (Costas e Bíceps)',
          duration: '60-70 min',
          exercises: [
            { name: 'Barra Fixa', sets: '4', reps: 'Máximo', rest: '2min' },
            { name: 'Remada Baixa', sets: '4', reps: '10-12', rest: '90s' },
            { name: 'Puxada Aberta', sets: '3', reps: '12-15', rest: '75s' },
            { name: 'Encolhimento', sets: '3', reps: '12-15', rest: '60s' },
            { name: 'Rosca 21', sets: '3', reps: '21', rest: '60s' },
            { name: 'Rosca Concentrada', sets: '3', reps: '12-15', rest: '60s' },
          ],
        },
        {
          day: 'Sábado',
          focus: 'Legs (Foco Glúteo/Posterior)',
          duration: '70-80 min',
          exercises: [
            { name: 'Agachamento Sumô', sets: '4', reps: '10-12', rest: '90s' },
            { name: 'Hip Thrust', sets: '4', reps: '12-15', rest: '90s' },
            { name: 'Agachamento Búlgaro', sets: '3', reps: '10-12 cada', rest: '90s' },
            { name: 'Cadeira Abdutora', sets: '4', reps: '15-20', rest: '60s' },
            { name: 'Stiff Unilateral', sets: '3', reps: '12-15 cada', rest: '75s' },
            { name: 'Panturrilha Sentado', sets: '4', reps: '15-20', rest: '60s' },
          ],
        },
      ]
    }

    setWorkoutPlan(plan)
  }

  const calculateWeeklyVolume = () => {
    // Exemplo de cálculo de volume semanal
    const volumes = {
      chest: '12-16 séries',
      back: '14-18 séries',
      legs: '16-20 séries',
      shoulders: '10-14 séries',
      arms: '12-16 séries',
    }
    return volumes
  }

  const volumes = calculateWeeklyVolume()

  return (
    <div className="space-y-6">
      {/* Header com informações motivacionais */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Seu Treino Personalizado
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Treino criado para {userData.daysAvailable} dias por semana, focado em{' '}
              <span className="font-bold text-blue-600">
                {userData.goal === 'emagrecer' ? 'queima de gordura e definição' : userData.goal === 'hipertrofia' ? 'ganho de massa muscular' : 'recomposição corporal'}
              </span>
              . Cada exercício foi escolhido estrategicamente para maximizar seus resultados.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Próxima evolução do treino em {weeksUntilUpdate} semanas</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Volume Semanal */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Volume Semanal por Grupo Muscular
        </h3>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-6">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Por que isso importa?</strong> O volume semanal (total de séries por grupo muscular) é crucial para hipertrofia.
              Músculos grandes precisam de 12-20 séries/semana, músculos pequenos 8-14 séries/semana. Seu treino foi calculado
              para estar na faixa ideal de estímulo.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-900/10 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{volumes.chest}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Peito</div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{volumes.back}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Costas</div>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{volumes.legs}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pernas</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-900/10 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{volumes.shoulders}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Ombros</div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-900/10 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{volumes.arms}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Braços</div>
          </div>
        </div>
      </Card>

      {/* Treinos */}
      <div className="space-y-4">
        {workoutPlan.map((day, index) => (
          <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{day.day}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30">
                    {day.focus}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{day.duration}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Zap className="w-4 h-4" />
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              {day.exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{exercise.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {exercise.sets} x {exercise.reps}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Descanso: {exercise.rest}</span>
                    {exercise.notes && (
                      <span className="text-purple-600 dark:text-purple-400">💡 {exercise.notes}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Informações sobre descanso */}
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-orange-600" />
          Importante sobre Descanso
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">⚠️</span>
            <span><strong>Membros inferiores:</strong> Respeite pelo menos 48-72h de descanso entre treinos de pernas para recuperação adequada</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span><strong>Progressão:</strong> Tente aumentar a carga ou repetições a cada semana</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span><strong>Técnica primeiro:</strong> Priorize sempre a execução correta antes de aumentar a carga</span>
          </p>
        </div>
      </Card>

      {/* Botão de atualização */}
      <Card className="p-6 text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <h3 className="text-lg font-bold mb-2">🔄 Evolução Automática</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Seu treino será atualizado automaticamente a cada 2 meses para garantir que você continue progredindo
          e evite platôs. Isso é essencial para resultados contínuos!
        </p>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Gerar Variação Agora
        </Button>
      </Card>
    </div>
  )
}
