'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChefHat, Clock, Flame, Apple, Beef, Wheat, Info, Calendar } from 'lucide-react'

interface DietPlanProps {
  userData: any
}

interface MacroNutrients {
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface FoodItem {
  name: string
  amount: string
  protein: number
  carbs: number
  fat: number
  calories: number
  isOptional?: boolean
}

interface MealOption {
  foods: FoodItem[]
}

interface Meal {
  name: string
  time: string
  options: MealOption[]
  selectedOption: number
  isMainMeal?: boolean // Identifica almoço e jantar
}

export function DietPlan({ userData }: DietPlanProps) {
  const [macros, setMacros] = useState<MacroNutrients>({ calories: 0, protein: 0, carbs: 0, fat: 0 })
  const [meals, setMeals] = useState<Meal[]>([])
  const [daysUntilUpdate, setDaysUntilUpdate] = useState(30)

  useEffect(() => {
    const calculatedMacros = calculateMacros()
    setMacros(calculatedMacros)
    generateMeals(calculatedMacros)
  }, [userData])

  const calculateMacros = () => {
    const weight = parseFloat(userData.weight)
    const height = parseFloat(userData.height)
    const age = parseFloat(userData.age)
    const gender = userData.gender

    // Cálculo TMB (Taxa Metabólica Basal) - Fórmula de Mifflin-St Jeor
    let tmb = 0
    if (gender === 'masculino') {
      tmb = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      tmb = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Fator de atividade baseado nos dias de treino
    const activityFactors: { [key: string]: number } = {
      '3': 1.375,
      '4': 1.55,
      '5': 1.725,
      '6': 1.9,
    }
    const activityFactor = activityFactors[userData.daysAvailable] || 1.55

    // GET (Gasto Energético Total)
    let get = tmb * activityFactor

    // Ajuste baseado no objetivo
    if (userData.goal === 'emagrecer') {
      get = get * 0.8 // Déficit de 20%
    } else if (userData.goal === 'hipertrofia') {
      get = get * 1.1 // Superávit de 10%
    }

    // Cálculo de macronutrientes
    let proteinGrams = 0
    let fatPercentage = 0

    if (userData.goal === 'emagrecer') {
      proteinGrams = weight * 2.2 // 2.0-2.4 g/kg
      fatPercentage = 0.15 // 10-20%
    } else if (userData.goal === 'hipertrofia') {
      proteinGrams = weight * 2.0 // 1.8-2.4 g/kg
      fatPercentage = 0.20 // 15-25%
    } else {
      proteinGrams = weight * 2.0
      fatPercentage = 0.20
    }

    const proteinCalories = proteinGrams * 4
    const fatCalories = get * fatPercentage
    const fatGrams = fatCalories / 9
    const carbCalories = get - proteinCalories - fatCalories
    const carbGrams = carbCalories / 4

    return {
      calories: Math.round(get),
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbGrams),
      fat: Math.round(fatGrams),
    }
  }

  const generateMeals = (calculatedMacros: MacroNutrients) => {
    const numMeals = parseInt(userData.mealsPerDay) || 5
    const isVegan = userData.dietaryRestrictions?.includes('Vegano')
    const isVegetarian = userData.dietaryRestrictions?.includes('Vegetariano')
    const isLactoseIntolerant = userData.dietaryRestrictions?.includes('Intolerância à lactose')
    const isGlutenIntolerant = userData.dietaryRestrictions?.includes('Intolerância ao glúten')

    const mealTemplates: Meal[] = []

    // Café da Manhã - 3 opções nutritivas
    mealTemplates.push({
      name: 'Café da Manhã',
      time: '07:00',
      selectedOption: 0,
      isMainMeal: false,
      options: [
        {
          foods: [
            { name: 'Tapioca', amount: '150g', protein: 1.5, carbs: 39, fat: 0, calories: 162 },
            { name: 'Ovo de galinha', amount: '3 unidades', protein: 18, carbs: 1.5, fat: 15, calories: 215 },
            { name: 'Queijo mussarela', amount: '30g', protein: 7, carbs: 1, fat: 6, calories: 85 },
            { name: 'Requeijão', amount: '15g', protein: 2, carbs: 1, fat: 5, calories: 56 },
          ]
        },
        {
          foods: [
            { name: 'Aveia em flocos', amount: '50g', protein: 6, carbs: 30, fat: 4, calories: 180 },
            { name: 'Ovo de galinha', amount: '2 unidades', protein: 12, carbs: 1, fat: 10, calories: 143 },
            { name: 'Banana', amount: '1 unidade (65g)', protein: 1, carbs: 15, fat: 0, calories: 62 },
            { name: 'Iogurte natural', amount: '150g', protein: 8, carbs: 12, fat: 3, calories: 105 },
          ]
        },
        {
          foods: [
            { name: 'Batata doce cozida', amount: '200g', protein: 2, carbs: 40, fat: 0, calories: 168 },
            { name: 'Ovo de galinha', amount: '3 unidades', protein: 18, carbs: 1.5, fat: 15, calories: 215 },
            { name: 'Queijo minas', amount: '40g', protein: 9, carbs: 1, fat: 2, calories: 56 },
            { name: 'Abacate', amount: '50g', protein: 1, carbs: 4, fat: 7, calories: 80 },
          ]
        }
      ]
    })

    // Lanche da Manhã - 3 opções nutritivas
    if (numMeals >= 5) {
      mealTemplates.push({
        name: 'Lanche da Manhã',
        time: '10:00',
        selectedOption: 0,
        isMainMeal: false,
        options: [
          {
            foods: [
              { name: 'Abacate', amount: '80g', protein: 1.6, carbs: 7, fat: 12, calories: 128 },
              { name: 'Aveia em flocos', amount: '30g', protein: 4, carbs: 18, fat: 2, calories: 108 },
              { name: 'Iogurte natural', amount: '200g', protein: 11, carbs: 16, fat: 4, calories: 140 },
            ]
          },
          {
            foods: [
              { name: 'Maçã', amount: '1 unidade (130g)', protein: 0, carbs: 19, fat: 0, calories: 76 },
              { name: 'Pasta de amendoim', amount: '20g', protein: 5, carbs: 4, fat: 8, calories: 116 },
              { name: 'Castanha-do-pará', amount: '15g', protein: 2, carbs: 2, fat: 10, calories: 104 },
            ]
          },
          {
            foods: [
              { name: 'Mamão papaya', amount: '150g', protein: 1, carbs: 15, fat: 0, calories: 64 },
              { name: 'Granola', amount: '30g', protein: 3, carbs: 20, fat: 3, calories: 117 },
              { name: 'Iogurte grego', amount: '100g', protein: 10, carbs: 4, fat: 5, calories: 97 },
            ]
          }
        ]
      })
    }

    // Almoço - 3 opções nutritivas
    mealTemplates.push({
      name: 'Almoço',
      time: '13:00',
      selectedOption: 0,
      isMainMeal: true,
      options: [
        {
          foods: [
            { name: 'Arroz cozido', amount: '300g', protein: 8, carbs: 84, fat: 0, calories: 368 },
            { name: 'Feijão carioca', amount: '100g', protein: 8, carbs: 20, fat: 1, calories: 117 },
            { name: 'Peito de frango grelhado', amount: '180g', protein: 50, carbs: 0, fat: 5, calories: 245 },
            { name: 'Azeite de oliva', amount: '10ml', protein: 0, carbs: 0, fat: 10, calories: 90 },
          ]
        },
        {
          foods: [
            { name: 'Batata doce cozida', amount: '505g', protein: 5, carbs: 101, fat: 0, calories: 424 },
            { name: 'Feijão preto', amount: '100g', protein: 8, carbs: 20, fat: 1, calories: 117 },
            { name: 'Patinho (carne vermelha magra)', amount: '180g', protein: 46, carbs: 0, fat: 6, calories: 244 },
          ]
        },
        {
          foods: [
            { name: 'Macarrão cozido', amount: '245g', protein: 8, carbs: 60, fat: 1, calories: 277 },
            { name: 'Feijão carioca', amount: '100g', protein: 8, carbs: 20, fat: 1, calories: 117 },
            { name: 'Peito de frango grelhado', amount: '180g', protein: 50, carbs: 0, fat: 5, calories: 245 },
          ]
        }
      ]
    })

    // Lanche da Tarde - 3 opções nutritivas
    mealTemplates.push({
      name: 'Lanche da Tarde',
      time: '16:00',
      selectedOption: 0,
      isMainMeal: false,
      options: [
        {
          foods: [
            { name: 'Pão francês', amount: '2 unidades (100g)', protein: 8, carbs: 52, fat: 2, calories: 254 },
            { name: 'Peito de frango desfiado', amount: '60g', protein: 17, carbs: 0, fat: 2, calories: 82 },
          ]
        },
        {
          foods: [
            { name: 'Tapioca', amount: '135g', protein: 1, carbs: 35, fat: 0, calories: 144 },
            { name: 'Peito de frango desfiado', amount: '60g', protein: 17, carbs: 0, fat: 2, calories: 82 },
            { name: 'Queijo minas', amount: '30g', protein: 7, carbs: 1, fat: 2, calories: 42 },
          ]
        },
        {
          foods: [
            { name: 'Batata doce cozida', amount: '200g', protein: 2, carbs: 40, fat: 0, calories: 168 },
            { name: 'Atum em lata (água)', amount: '80g', protein: 20, carbs: 0, fat: 1, calories: 89 },
            { name: 'Azeite de oliva', amount: '5ml', protein: 0, carbs: 0, fat: 5, calories: 45 },
          ]
        }
      ]
    })

    // Jantar - 3 opções nutritivas
    mealTemplates.push({
      name: 'Jantar',
      time: '19:30',
      selectedOption: 0,
      isMainMeal: true,
      options: [
        {
          foods: [
            { name: 'Arroz integral cozido', amount: '200g', protein: 5, carbs: 46, fat: 1, calories: 213 },
            { name: 'Feijão preto', amount: '80g', protein: 6, carbs: 16, fat: 1, calories: 94 },
            { name: 'Peito de frango grelhado', amount: '150g', protein: 42, carbs: 0, fat: 4, calories: 204 },
          ]
        },
        {
          foods: [
            { name: 'Batata inglesa cozida', amount: '400g', protein: 8, carbs: 68, fat: 0, calories: 304 },
            { name: 'Salmão grelhado', amount: '150g', protein: 30, carbs: 0, fat: 10, calories: 220 },
          ]
        },
        {
          foods: [
            { name: 'Mandioca cozida', amount: '310g', protein: 3, carbs: 78, fat: 1, calories: 329 },
            { name: 'Carne moída magra', amount: '150g', protein: 36, carbs: 0, fat: 8, calories: 228 },
          ]
        }
      ]
    })

    // Ceia (se 6 refeições) - 3 opções nutritivas
    if (numMeals === 6) {
      mealTemplates.push({
        name: 'Ceia',
        time: '22:00',
        selectedOption: 0,
        isMainMeal: false,
        options: [
          {
            foods: [
              { name: 'Iogurte grego', amount: '200g', protein: 20, carbs: 8, fat: 10, calories: 194 },
              { name: 'Morango', amount: '50g', protein: 0, carbs: 4, fat: 0, calories: 16 },
              { name: 'Amêndoas', amount: '15g', protein: 3, carbs: 3, fat: 7, calories: 87 },
            ]
          },
          {
            foods: [
              { name: 'Queijo cottage', amount: '150g', protein: 16, carbs: 5, fat: 3, calories: 108 },
              { name: 'Abacaxi', amount: '100g', protein: 1, carbs: 13, fat: 0, calories: 56 },
              { name: 'Chia', amount: '10g', protein: 2, carbs: 4, fat: 3, calories: 49 },
            ]
          },
          {
            foods: [
              { name: 'Ovo cozido', amount: '2 unidades', protein: 12, carbs: 1, fat: 10, calories: 143 },
              { name: 'Abacate', amount: '50g', protein: 1, carbs: 4, fat: 7, calories: 80 },
            ]
          }
        ]
      })
    }

    setMeals(mealTemplates)
  }

  const changeMealOption = (mealIndex: number, optionIndex: number) => {
    setMeals(prevMeals => {
      const newMeals = [...prevMeals]
      newMeals[mealIndex].selectedOption = optionIndex
      return newMeals
    })
  }

  // Função para calcular totais reais de uma refeição (SEM itens opcionais)
  const calculateMealTotals = (foods: FoodItem[]) => {
    return foods
      .filter(food => !food.isOptional) // Exclui opcionais do cálculo
      .reduce(
        (acc, food) => ({
          protein: acc.protein + food.protein,
          carbs: acc.carbs + food.carbs,
          fat: acc.fat + food.fat,
          calories: acc.calories + food.calories
        }),
        { protein: 0, carbs: 0, fat: 0, calories: 0 }
      )
  }

  return (
    <div className="space-y-6">
      {/* Header com informações motivacionais */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
        <div className="flex items-start gap-4">
          <div className="bg-green-600 p-3 rounded-full">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Sua Dieta Personalizada
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Este plano foi calculado especialmente para você, considerando seu objetivo de{' '}
              <span className="font-bold text-green-600">
                {userData.goal === 'emagrecer' ? 'emagrecimento' : userData.goal === 'hipertrofia' ? 'ganho de massa muscular' : 'recomposição corporal'}
              </span>
              , seu metabolismo e sua rotina.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Próxima atualização automática em {daysUntilUpdate} dias</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Macronutrientes */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-600" />
          Seus Macronutrientes Diários
        </h3>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-6">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Por que esses valores?</strong> Calculamos seu metabolismo basal (TMB) e gasto energético total (GET)
              baseado em sua idade, peso, altura e nível de atividade. 
              {userData.goal === 'emagrecer' && ' Para emagrecer, criamos um déficit calórico de 20% e aumentamos a proteína para preservar massa muscular.'}
              {userData.goal === 'hipertrofia' && ' Para ganhar massa, criamos um superávit calórico de 10% e garantimos proteína suficiente para construção muscular.'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-900/10 p-4 rounded-xl text-center">
            <Flame className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{macros.calories}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Calorias</div>
          </div>
          <div className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-900/10 p-4 rounded-xl text-center">
            <Beef className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{macros.protein}g</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Proteína</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-900/10 p-4 rounded-xl text-center">
            <Wheat className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{macros.carbs}g</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Carboidratos</div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 p-4 rounded-xl text-center">
            <Apple className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{macros.fat}g</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Gorduras</div>
          </div>
        </div>
      </Card>

      {/* Refeições */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Suas {meals.length} Refeições do Dia
          </h3>
        </div>

        <div className="space-y-4">
          {meals.map((meal, mealIndex) => {
            const mealTotals = calculateMealTotals(meal.options[meal.selectedOption].foods)
            
            return (
              <Card key={mealIndex} className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{meal.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{meal.time}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30">
                    {mealTotals.calories} kcal
                  </Badge>
                </div>

                <Separator className="my-3" />

                {/* Opções de refeição */}
                <div className="flex gap-2 mb-4">
                  {meal.options.map((_, optionIndex) => (
                    <Button
                      key={optionIndex}
                      variant={meal.selectedOption === optionIndex ? "default" : "outline"}
                      size="sm"
                      onClick={() => changeMealOption(mealIndex, optionIndex)}
                      className="flex-1"
                    >
                      Opção {optionIndex + 1}
                    </Button>
                  ))}
                </div>

                {/* Alimentos da opção selecionada */}
                <div className="space-y-2 mb-4">
                  {meal.options[meal.selectedOption].foods.map((food, foodIndex) => (
                    <div key={foodIndex} className={`flex items-start justify-between text-gray-700 dark:text-gray-300 p-3 rounded-lg ${
                      food.isOptional ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800' : 'bg-gray-50 dark:bg-gray-800/50'
                    }`}>
                      <div className="flex items-start gap-2 flex-1">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          food.isOptional ? 'bg-amber-600' : 'bg-green-600'
                        }`}></div>
                        <div className="flex-1">
                          <div className="font-medium">
                            {food.amount} de {food.name}
                            {food.isOptional && <span className="ml-2 text-xs text-amber-600 dark:text-amber-400 font-semibold">(Opcional)</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-right ml-4 space-y-0.5">
                        <div className="text-red-600 dark:text-red-400 font-medium">{food.protein}g P</div>
                        <div className="text-yellow-600 dark:text-yellow-400 font-medium">{food.carbs}g C</div>
                        <div className="text-blue-600 dark:text-blue-400 font-medium">{food.fat}g G</div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Especificação de saladas e legumes para almoço e jantar */}
                  {meal.isMainMeal && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="font-medium text-green-700 dark:text-green-400">
                            Saladas à vontade
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Alface, rúcula, tomate, pepino, cenoura ralada, etc. Use azeite apenas se estiver listado acima.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {meal.isMainMeal && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="font-medium text-amber-700 dark:text-amber-400">
                            Legumes 80g (Opcional)
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Brócolis, cenoura, abobrinha, couve, ou outros legumes de sua preferência.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Totais da refeição - CALCULADOS CORRETAMENTE (sem opcionais) */}
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                    <div className="font-bold text-red-700 dark:text-red-400">{mealTotals.protein.toFixed(1)}g</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Proteína</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                    <div className="font-bold text-yellow-700 dark:text-yellow-400">{mealTotals.carbs.toFixed(1)}g</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Carbs</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                    <div className="font-bold text-blue-700 dark:text-blue-400">{mealTotals.fat.toFixed(1)}g</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Gordura</div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Card>

      {/* Dicas e Informações */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <h3 className="text-lg font-bold mb-4">💡 Dicas Importantes</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Beba pelo menos 2-3 litros de água por dia</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Use as 3 opções de cada refeição para variar sua alimentação e não enjoar</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span><strong>Saladas à vontade</strong> no almoço e jantar ajudam na saciedade sem adicionar muitas calorias</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">⚠</span>
            <span><strong>Legumes são opcionais (80g)</strong> - se você não gosta, pode pular sem problemas. As calorias já estão ajustadas.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">⚠</span>
            <span><strong>Use azeite apenas se estiver listado</strong> no plano para não interferir nas calorias calculadas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Seu plano será atualizado automaticamente a cada 30 dias com base no seu progresso</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Consistência é mais importante que perfeição - siga o plano 80-90% do tempo</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
