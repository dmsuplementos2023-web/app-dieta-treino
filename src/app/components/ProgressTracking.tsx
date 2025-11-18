'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Camera, TrendingUp, Scale, Ruler, Calendar, Plus, Info, LineChart } from 'lucide-react'

interface ProgressTrackingProps {
  userData: any
}

interface ProgressEntry {
  date: string
  weight: number
  measurements: {
    chest?: number
    waist?: number
    hips?: number
    thigh?: number
    arm?: number
  }
  photos?: string[]
}

export function ProgressTracking({ userData }: ProgressTrackingProps) {
  const [progressHistory, setProgressHistory] = useState<ProgressEntry[]>([
    {
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(userData.weight),
      measurements: {},
    },
  ])

  const [newEntry, setNewEntry] = useState({
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    thigh: '',
    arm: '',
  })

  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddEntry = () => {
    const entry: ProgressEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(newEntry.weight) || progressHistory[progressHistory.length - 1].weight,
      measurements: {
        chest: newEntry.chest ? parseFloat(newEntry.chest) : undefined,
        waist: newEntry.waist ? parseFloat(newEntry.waist) : undefined,
        hips: newEntry.hips ? parseFloat(newEntry.hips) : undefined,
        thigh: newEntry.thigh ? parseFloat(newEntry.thigh) : undefined,
        arm: newEntry.arm ? parseFloat(newEntry.arm) : undefined,
      },
    }

    setProgressHistory([...progressHistory, entry])
    setNewEntry({ weight: '', chest: '', waist: '', hips: '', thigh: '', arm: '' })
    setShowAddForm(false)
  }

  const calculateWeightChange = () => {
    if (progressHistory.length < 2) return 0
    const first = progressHistory[0].weight
    const last = progressHistory[progressHistory.length - 1].weight
    return (last - first).toFixed(1)
  }

  const getMotivationalMessage = () => {
    const change = parseFloat(calculateWeightChange())
    
    if (userData.goal === 'emagrecer') {
      if (change < 0) {
        return {
          emoji: '🎉',
          title: 'Parabéns! Você está no caminho certo!',
          message: `Você já perdeu ${Math.abs(change)}kg! Continue assim e seus resultados serão incríveis.`,
          color: 'from-green-500 to-emerald-500',
        }
      } else if (change === 0) {
        return {
          emoji: '💪',
          title: 'Mantenha o foco!',
          message: 'O peso pode não mudar imediatamente, mas seu corpo está se transformando. Continue firme!',
          color: 'from-blue-500 to-cyan-500',
        }
      } else {
        return {
          emoji: '🔄',
          title: 'Vamos ajustar!',
          message: 'Seu plano será atualizado automaticamente para otimizar seus resultados.',
          color: 'from-orange-500 to-yellow-500',
        }
      }
    } else if (userData.goal === 'hipertrofia') {
      if (change > 0) {
        return {
          emoji: '💪',
          title: 'Excelente! Você está crescendo!',
          message: `Você ganhou ${change}kg! Continue treinando pesado e comendo bem.`,
          color: 'from-purple-500 to-pink-500',
        }
      } else if (change === 0) {
        return {
          emoji: '⚡',
          title: 'Continue consistente!',
          message: 'O ganho de massa leva tempo. Mantenha o treino intenso e a alimentação em dia!',
          color: 'from-blue-500 to-cyan-500',
        }
      } else {
        return {
          emoji: '🍽️',
          title: 'Vamos aumentar as calorias!',
          message: 'Para ganhar massa, você precisa comer mais. Seu plano será ajustado automaticamente.',
          color: 'from-orange-500 to-yellow-500',
        }
      }
    } else {
      return {
        emoji: '🎯',
        title: 'Você está evoluindo!',
        message: 'Continue acompanhando seu progresso. A transformação está acontecendo!',
        color: 'from-purple-500 to-pink-500',
      }
    }
  }

  const motivationalMsg = getMotivationalMessage()

  return (
    <div className="space-y-6">
      {/* Header Motivacional */}
      <Card className={`p-6 bg-gradient-to-r ${motivationalMsg.color} text-white`}>
        <div className="flex items-start gap-4">
          <div className="text-5xl">{motivationalMsg.emoji}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{motivationalMsg.title}</h2>
            <p className="text-white/90">{motivationalMsg.message}</p>
          </div>
        </div>
      </Card>

      {/* Importância do Acompanhamento */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
              Por que acompanhar seu progresso é crucial?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Motivação visual:</strong> Ver sua evolução em números e fotos mantém você motivado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Ajustes precisos:</strong> Seus dados permitem ajustes automáticos no plano a cada 30 dias</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Progresso real:</strong> O peso pode não mudar, mas as medidas mostram a transformação</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Celebrar vitórias:</strong> Cada centímetro perdido ou ganho é uma conquista!</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Resumo Atual */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 text-center bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-900/10">
          <Scale className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {progressHistory[progressHistory.length - 1].weight}kg
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Peso Atual</div>
          {progressHistory.length > 1 && (
            <div className={`text-sm font-semibold mt-2 ${parseFloat(calculateWeightChange()) < 0 ? 'text-green-600' : parseFloat(calculateWeightChange()) > 0 ? 'text-blue-600' : 'text-gray-600'}`}>
              {parseFloat(calculateWeightChange()) > 0 ? '+' : ''}{calculateWeightChange()}kg
            </div>
          )}
        </Card>

        <Card className="p-6 text-center bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10">
          <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {progressHistory.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Registros</div>
        </Card>

        <Card className="p-6 text-center bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {Math.floor((new Date().getTime() - new Date(progressHistory[0].date).getTime()) / (1000 * 60 * 60 * 24))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Dias de Jornada</div>
        </Card>
      </div>

      {/* Botão Adicionar Registro */}
      {!showAddForm && (
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
          size="lg"
        >
          <Plus className="mr-2" />
          Adicionar Novo Registro
        </Button>
      )}

      {/* Formulário de Novo Registro */}
      {showAddForm && (
        <Card className="p-6 border-2 border-purple-200 dark:border-purple-800">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-600" />
            Novo Registro de Progresso
          </h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Peso (kg) *
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 70.5"
                  value={newEntry.weight}
                  onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chest" className="flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  Peitoral (cm)
                </Label>
                <Input
                  id="chest"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 95"
                  value={newEntry.chest}
                  onChange={(e) => setNewEntry({ ...newEntry, chest: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waist">Cintura (cm)</Label>
                <Input
                  id="waist"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 80"
                  value={newEntry.waist}
                  onChange={(e) => setNewEntry({ ...newEntry, waist: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hips">Quadril (cm)</Label>
                <Input
                  id="hips"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 95"
                  value={newEntry.hips}
                  onChange={(e) => setNewEntry({ ...newEntry, hips: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thigh">Coxa (cm)</Label>
                <Input
                  id="thigh"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 55"
                  value={newEntry.thigh}
                  onChange={(e) => setNewEntry({ ...newEntry, thigh: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arm">Braço (cm)</Label>
                <Input
                  id="arm"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 35"
                  value={newEntry.arm}
                  onChange={(e) => setNewEntry({ ...newEntry, arm: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleAddEntry} 
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                disabled={!newEntry.weight}
              >
                Salvar Registro
              </Button>
              <Button 
                onClick={() => setShowAddForm(false)} 
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Histórico de Progresso */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <LineChart className="w-5 h-5 text-purple-600" />
          Histórico de Progresso
        </h3>
        <div className="space-y-3">
          {progressHistory.slice().reverse().map((entry, index) => (
            <Card key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date(entry.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30">
                  {entry.weight}kg
                </Badge>
              </div>
              
              {Object.keys(entry.measurements).length > 0 && (
                <>
                  <Separator className="my-3" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    {entry.measurements.chest && (
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">Peitoral:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{entry.measurements.chest}cm</span>
                      </div>
                    )}
                    {entry.measurements.waist && (
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">Cintura:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{entry.measurements.waist}cm</span>
                      </div>
                    )}
                    {entry.measurements.hips && (
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">Quadril:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{entry.measurements.hips}cm</span>
                      </div>
                    )}
                    {entry.measurements.thigh && (
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">Coxa:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{entry.measurements.thigh}cm</span>
                      </div>
                    )}
                    {entry.measurements.arm && (
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">Braço:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{entry.measurements.arm}cm</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Fotos de Progresso */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5 text-purple-600" />
          Fotos de Progresso
        </h3>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl text-center">
          <Camera className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
            Registre sua transformação visual
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Tire fotos mensais no mesmo ângulo e iluminação para ver sua evolução real.
            As fotos mostram mudanças que a balança não revela!
          </p>
          <Button variant="outline" className="gap-2">
            <Camera className="w-4 h-4" />
            Adicionar Fotos
          </Button>
        </div>
      </Card>

      {/* Atualização Automática */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Ajustes Automáticos
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p className="flex items-start gap-2">
            <span className="text-green-600 font-bold">🔄</span>
            <span><strong>A cada 30 dias:</strong> Seu plano de dieta será recalculado automaticamente com base no seu progresso</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-600 font-bold">💪</span>
            <span><strong>A cada 2 meses:</strong> Seu treino será atualizado para continuar desafiando seu corpo</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-600 font-bold">📊</span>
            <span><strong>Baseado em dados:</strong> Quanto mais você registrar, mais precisos serão os ajustes</span>
          </p>
        </div>
      </Card>
    </div>
  )
}
