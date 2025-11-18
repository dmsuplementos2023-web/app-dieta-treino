'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Heart, Target, User, Calendar, Brain, Moon, GraduationCap, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'

interface QuizFlowProps {
  onComplete: (data: any) => void
}

export function QuizFlow({ onComplete }: QuizFlowProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    // T1 - Objetivo
    goal: '',
    // T2 - Dados Básicos
    age: '',
    gender: '',
    height: '',
    weight: '',
    // T3 - Rotina
    daysAvailable: '',
    timePerWorkout: '',
    workoutLocation: '',
    // T4 - Parte Emocional
    mainDifficulty: '',
    mirrorFeeling: '',
    motivation: '',
    // T5 - Hábitos
    sleepHours: '',
    energyLevel: '',
    workoutHistory: '',
    // T6 - Quiz Educativo
    quizAnswers: [] as string[],
    // Restrições alimentares
    dietaryRestrictions: [] as string[],
    budget: '',
    mealsPerDay: '5',
  })

  const totalSteps = 8
  const progress = (step / totalSteps) * 100

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      onComplete(formData)
    }
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-6 animate-in fade-in duration-700">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-full">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Bem-vindo à Sua Transformação
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Estamos aqui para criar um plano <span className="font-bold text-purple-600">100% personalizado</span> para você.
              Cada resposta nos ajuda a entender melhor suas necessidades e criar o caminho perfeito para seus objetivos.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl max-w-xl mx-auto">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                ✨ Este não é apenas mais um app de fitness. É o seu parceiro de transformação pessoal,
                que entende suas emoções, sua rotina e seus sonhos.
              </p>
            </div>
            <Button 
              onClick={nextStep} 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg"
            >
              Começar Minha Jornada <ArrowRight className="ml-2" />
            </Button>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold">Qual é o Seu Objetivo?</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Escolha o que mais se conecta com o que você deseja alcançar:
            </p>
            <RadioGroup value={formData.goal} onValueChange={(value) => updateFormData('goal', value)}>
              <div className="space-y-4">
                {[
                  { value: 'emagrecer', label: 'Emagrecer e Definir', desc: 'Perder gordura e revelar seu corpo' },
                  { value: 'hipertrofia', label: 'Ganhar Massa Muscular', desc: 'Construir músculos e força' },
                  { value: 'recomposicao', label: 'Recomposição Corporal', desc: 'Ganhar músculo e perder gordura' },
                  { value: 'saude', label: 'Melhorar Saúde e Autoestima', desc: 'Sentir-se bem e saudável' },
                ].map((option) => (
                  <Card 
                    key={option.value}
                    className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                      formData.goal === option.value ? 'ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-900/20' : ''
                    }`}
                    onClick={() => updateFormData('goal', option.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <div>
                        <Label htmlFor={option.value} className="text-lg font-semibold cursor-pointer">
                          {option.label}
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold">Seus Dados Básicos</h2>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Por que precisamos disso?</strong> Esses dados nos ajudam a calcular seu metabolismo basal
                e gasto energético total (GET), essenciais para criar sua dieta personalizada.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Ex: 25"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Sexo</Label>
                <RadioGroup value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="masculino" id="masculino" />
                      <Label htmlFor="masculino">Masculino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feminino" id="feminino" />
                      <Label htmlFor="feminino">Feminino</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Ex: 170"
                  value={formData.height}
                  onChange={(e) => updateFormData('height', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Ex: 70"
                  value={formData.weight}
                  onChange={(e) => updateFormData('weight', e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold">Sua Rotina de Treino</h2>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Viabilidade é tudo!</strong> Queremos criar um treino que se encaixe perfeitamente
                na sua vida, para que você consiga manter a consistência.
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Quantos dias por semana você pode treinar?</Label>
                <RadioGroup value={formData.daysAvailable} onValueChange={(value) => updateFormData('daysAvailable', value)}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['3', '4', '5', '6'].map((days) => (
                      <Card 
                        key={days}
                        className={`p-4 cursor-pointer text-center transition-all hover:shadow-lg ${
                          formData.daysAvailable === days ? 'ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-900/20' : ''
                        }`}
                        onClick={() => updateFormData('daysAvailable', days)}
                      >
                        <RadioGroupItem value={days} id={`days-${days}`} className="mx-auto mb-2" />
                        <Label htmlFor={`days-${days}`} className="text-lg font-bold cursor-pointer">{days} dias</Label>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Quanto tempo por treino?</Label>
                <RadioGroup value={formData.timePerWorkout} onValueChange={(value) => updateFormData('timePerWorkout', value)}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: '30-45', label: '30-45 min' },
                      { value: '45-60', label: '45-60 min' },
                      { value: '60-90', label: '60-90 min' },
                      { value: '90+', label: '90+ min' },
                    ].map((option) => (
                      <Card 
                        key={option.value}
                        className={`p-4 cursor-pointer text-center transition-all hover:shadow-lg ${
                          formData.timePerWorkout === option.value ? 'ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-900/20' : ''
                        }`}
                        onClick={() => updateFormData('timePerWorkout', option.value)}
                      >
                        <RadioGroupItem value={option.value} id={`time-${option.value}`} className="mx-auto mb-2" />
                        <Label htmlFor={`time-${option.value}`} className="cursor-pointer">{option.label}</Label>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Onde você vai treinar?</Label>
                <RadioGroup value={formData.workoutLocation} onValueChange={(value) => updateFormData('workoutLocation', value)}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'academia', label: 'Academia' },
                      { value: 'casa', label: 'Em Casa' },
                    ].map((option) => (
                      <Card 
                        key={option.value}
                        className={`p-4 cursor-pointer text-center transition-all hover:shadow-lg ${
                          formData.workoutLocation === option.value ? 'ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-900/20' : ''
                        }`}
                        onClick={() => updateFormData('workoutLocation', option.value)}
                      >
                        <RadioGroupItem value={option.value} id={`location-${option.value}`} className="mx-auto mb-2" />
                        <Label htmlFor={`location-${option.value}`} className="cursor-pointer">{option.label}</Label>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-pink-600" />
              <h2 className="text-3xl font-bold">Vamos Falar do Emocional</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Entender suas emoções nos ajuda a criar um plano que realmente funcione para você.
            </p>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Qual sua maior dificuldade hoje?</Label>
                <RadioGroup value={formData.mainDifficulty} onValueChange={(value) => updateFormData('mainDifficulty', value)}>
                  <div className="space-y-3">
                    {[
                      'Falta de motivação',
                      'Não sei por onde começar',
                      'Falta de tempo',
                      'Dificuldade em manter consistência',
                      'Resultados lentos',
                    ].map((option) => (
                      <Card 
                        key={option}
                        className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                          formData.mainDifficulty === option ? 'ring-2 ring-pink-600 bg-pink-50 dark:bg-pink-900/20' : ''
                        }`}
                        onClick={() => updateFormData('mainDifficulty', option)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                        </div>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Como você se sente quando se olha no espelho?</Label>
                <RadioGroup value={formData.mirrorFeeling} onValueChange={(value) => updateFormData('mirrorFeeling', value)}>
                  <div className="space-y-3">
                    {[
                      'Insatisfeito(a) e desmotivado(a)',
                      'Quero melhorar, mas não sei como',
                      'Vejo potencial, preciso de direção',
                      'Satisfeito(a), mas quero evoluir mais',
                    ].map((option) => (
                      <Card 
                        key={option}
                        className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                          formData.mirrorFeeling === option ? 'ring-2 ring-pink-600 bg-pink-50 dark:bg-pink-900/20' : ''
                        }`}
                        onClick={() => updateFormData('mirrorFeeling', option)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                        </div>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">O que te motiva a mudar agora?</Label>
                <Input
                  id="motivation"
                  placeholder="Ex: Quero me sentir bem comigo mesmo(a)"
                  value={formData.motivation}
                  onChange={(e) => updateFormData('motivation', e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-6">
              <Moon className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold">Seus Hábitos Atuais</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Quantas horas você dorme por noite?</Label>
                <RadioGroup value={formData.sleepHours} onValueChange={(value) => updateFormData('sleepHours', value)}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Menos de 5h', '5-6h', '7-8h', 'Mais de 8h'].map((option) => (
                      <Card 
                        key={option}
                        className={`p-4 cursor-pointer text-center transition-all hover:shadow-lg ${
                          formData.sleepHours === option ? 'ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-900/20' : ''
                        }`}
                        onClick={() => updateFormData('sleepHours', option)}
                      >
                        <RadioGroupItem value={option} id={option} className="mx-auto mb-2" />
                        <Label htmlFor={option} className="cursor-pointer text-sm">{option}</Label>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Como está seu nível de energia no dia a dia?</Label>
                <RadioGroup value={formData.energyLevel} onValueChange={(value) => updateFormData('energyLevel', value)}>
                  <div className="space-y-3">
                    {[
                      'Sempre cansado(a)',
                      'Energia moderada',
                      'Boa energia',
                      'Muita energia',
                    ].map((option) => (
                      <Card 
                        key={option}
                        className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                          formData.energyLevel === option ? 'ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-900/20' : ''
                        }`}
                        onClick={() => updateFormData('energyLevel', option)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                        </div>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Você já treinou antes?</Label>
                <RadioGroup value={formData.workoutHistory} onValueChange={(value) => updateFormData('workoutHistory', value)}>
                  <div className="space-y-3">
                    {[
                      'Nunca treinei',
                      'Já treinei, mas parei há muito tempo',
                      'Treino de vez em quando',
                      'Treino regularmente',
                    ].map((option) => (
                      <Card 
                        key={option}
                        className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                          formData.workoutHistory === option ? 'ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-900/20' : ''
                        }`}
                        onClick={() => updateFormData('workoutHistory', option)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                        </div>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold">Quiz Rápido Educativo</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Vamos testar alguns conhecimentos básicos e aprender juntos!
            </p>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">1. O que é mais importante para emagrecer?</h3>
                <RadioGroup 
                  value={formData.quizAnswers[0]} 
                  onValueChange={(value) => {
                    const newAnswers = [...formData.quizAnswers]
                    newAnswers[0] = value
                    updateFormData('quizAnswers', newAnswers)
                  }}
                >
                  <div className="space-y-2">
                    {[
                      'Fazer muito cardio',
                      'Déficit calórico consistente',
                      'Cortar carboidratos',
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {formData.quizAnswers[0] && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      ✅ <strong>Resposta correta: Déficit calórico consistente.</strong> Para emagrecer, você precisa
                      consumir menos calorias do que gasta. O cardio ajuda, mas a dieta é fundamental!
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">2. Quantas refeições você deve fazer por dia?</h3>
                <RadioGroup 
                  value={formData.quizAnswers[1]} 
                  onValueChange={(value) => {
                    const newAnswers = [...formData.quizAnswers]
                    newAnswers[1] = value
                    updateFormData('quizAnswers', newAnswers)
                  }}
                >
                  <div className="space-y-2">
                    {[
                      'Exatamente 6 refeições',
                      'O que funcionar melhor para você',
                      'Apenas 3 refeições grandes',
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {formData.quizAnswers[1] && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      ✅ <strong>Resposta correta: O que funcionar melhor para você.</strong> O número de refeições
                      não importa tanto quanto o total de calorias e macros do dia. Escolha o que se encaixa na sua rotina!
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">3. Para ganhar músculo, o mais importante é:</h3>
                <RadioGroup 
                  value={formData.quizAnswers[2]} 
                  onValueChange={(value) => {
                    const newAnswers = [...formData.quizAnswers]
                    newAnswers[2] = value
                    updateFormData('quizAnswers', newAnswers)
                  }}
                >
                  <div className="space-y-2">
                    {[
                      'Treinar todos os dias',
                      'Consumir proteína suficiente + treino progressivo',
                      'Tomar suplementos caros',
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {formData.quizAnswers[2] && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      ✅ <strong>Resposta correta: Consumir proteína suficiente + treino progressivo.</strong> 
                      Hipertrofia acontece quando você treina com intensidade, descansa adequadamente e fornece
                      proteína suficiente para o corpo construir músculo!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold">Últimos Detalhes</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Você tem alguma restrição alimentar?</Label>
                <div className="space-y-2">
                  {[
                    'Vegetariano',
                    'Vegano',
                    'Intolerância à lactose',
                    'Intolerância ao glúten',
                    'Nenhuma',
                  ].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={formData.dietaryRestrictions.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData('dietaryRestrictions', [...formData.dietaryRestrictions, option])
                          } else {
                            updateFormData('dietaryRestrictions', formData.dietaryRestrictions.filter((r: string) => r !== option))
                          }
                        }}
                      />
                      <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Qual seu orçamento para alimentação?</Label>
                <RadioGroup value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
                  <div className="space-y-3">
                    {[
                      { value: 'baixo', label: 'Econômico', desc: 'Opções acessíveis e práticas' },
                      { value: 'medio', label: 'Moderado', desc: 'Equilíbrio entre qualidade e preço' },
                      { value: 'alto', label: 'Flexível', desc: 'Priorizo qualidade e variedade' },
                    ].map((option) => (
                      <Card 
                        key={option.value}
                        className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                          formData.budget === option.value ? 'ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-900/20' : ''
                        }`}
                        onClick={() => updateFormData('budget', option.value)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <div>
                            <Label htmlFor={option.value} className="font-semibold cursor-pointer">{option.label}</Label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Quantas refeições por dia você prefere?</Label>
                <div className="pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">4 refeições</span>
                    <span className="text-sm font-bold text-purple-600">{formData.mealsPerDay} refeições</span>
                    <span className="text-sm text-gray-600">6 refeições</span>
                  </div>
                  <Slider
                    value={[parseInt(formData.mealsPerDay)]}
                    onValueChange={(value) => updateFormData('mealsPerDay', value[0].toString())}
                    min={4}
                    max={6}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center space-y-6 animate-in fade-in duration-700">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-full animate-pulse">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Estamos Criando Seu Plano!
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Com base em todas as suas respostas, estamos gerando um plano de treino e dieta
              <span className="font-bold text-green-600"> 100% personalizado</span> para você.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl max-w-xl mx-auto">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                ✨ Seu plano incluirá:
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>✓ Dieta personalizada com {formData.mealsPerDay} refeições diárias</li>
                <li>✓ Treino adaptado para {formData.daysAvailable} dias por semana</li>
                <li>✓ Acompanhamento de progresso com fotos e medidas</li>
                <li>✓ Ajustes automáticos a cada 30 dias</li>
                <li>✓ Evolução do treino a cada 2 meses</li>
              </ul>
            </div>
            <div className="pt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {step > 0 && step < totalSteps && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Etapa {step} de {totalSteps - 1}
              </span>
              <span className="text-sm font-medium text-purple-600">
                {Math.round(progress)}% completo
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Card className="p-6 md:p-10 shadow-2xl">
          {renderStep()}

          {step > 0 && step < totalSteps && (
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
                </Button>
              )}
              <Button
                onClick={nextStep}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                disabled={
                  (step === 1 && !formData.goal) ||
                  (step === 2 && (!formData.age || !formData.gender || !formData.height || !formData.weight)) ||
                  (step === 3 && (!formData.daysAvailable || !formData.timePerWorkout || !formData.workoutLocation)) ||
                  (step === 7 && !formData.budget)
                }
              >
                {step === totalSteps - 1 ? 'Gerar Meu Plano' : 'Continuar'} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
