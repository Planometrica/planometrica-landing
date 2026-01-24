import { useState, useMemo, Component, type ReactNode } from 'react'

// Константы для лимитов калькулятора
const LOAN_LIMITS = {
  AMOUNT: { MIN: 1_000_000, MAX: 30_000_000, STEP: 100_000 },
  RATE: { MIN: 3, MAX: 20, STEP: 0.1 },
  TERM: { MIN: 1, MAX: 30, STEP: 1 },
} as const

// Error Boundary для graceful error handling
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class MortgageErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0A4C76] to-[#1A7BB3]">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Калькулятор временно недоступен
                </h2>
                <p className="text-white/70 mb-6">
                  Попробуйте обновить страницу или вернуться позже.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-white text-[#0A4C76] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Обновить страницу
                </button>
              </div>
            </div>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

interface MortgageCalculatorProps {
  defaultAmount?: number
  defaultRate?: number
  defaultTerm?: number
}

function MortgageCalculatorInner({
  defaultAmount = 5_000_000,
  defaultRate = 6,
  defaultTerm = 20
}: MortgageCalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount)
  const [rate, setRate] = useState(defaultRate)
  const [term, setTerm] = useState(defaultTerm)

  const calculation = useMemo(() => {
    const monthlyRate = rate / 100 / 12
    const numberOfPayments = term * 12

    // Annuity payment formula
    const monthlyPayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - amount

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest)
    }
  }, [amount, rate, term])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num)
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0A4C76] to-[#1A7BB3]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white/10 text-white/90 font-medium rounded-full text-sm mb-4 backdrop-blur-sm">
              Калькулятор
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Рассчитайте ипотеку
            </h2>
            <p className="text-lg text-white/70">
              Узнайте примерный ежемесячный платёж
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Inputs */}
              <div className="space-y-8">
                {/* Amount */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Сумма кредита
                    </label>
                    <span className="text-sm font-semibold text-[#0A4C76]">
                      {formatNumber(amount)} ₽
                    </span>
                  </div>
                  <input
                    type="range"
                    min={LOAN_LIMITS.AMOUNT.MIN}
                    max={LOAN_LIMITS.AMOUNT.MAX}
                    step={LOAN_LIMITS.AMOUNT.STEP}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0A4C76]"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>{formatNumber(LOAN_LIMITS.AMOUNT.MIN / 1_000_000)} млн</span>
                    <span>{formatNumber(LOAN_LIMITS.AMOUNT.MAX / 1_000_000)} млн</span>
                  </div>
                </div>

                {/* Rate */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Процентная ставка
                    </label>
                    <span className="text-sm font-semibold text-[#0A4C76]">
                      {rate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={LOAN_LIMITS.RATE.MIN}
                    max={LOAN_LIMITS.RATE.MAX}
                    step={LOAN_LIMITS.RATE.STEP}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0A4C76]"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>{LOAN_LIMITS.RATE.MIN}%</span>
                    <span>{LOAN_LIMITS.RATE.MAX}%</span>
                  </div>
                </div>

                {/* Term */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Срок кредита
                    </label>
                    <span className="text-sm font-semibold text-[#0A4C76]">
                      {term} лет
                    </span>
                  </div>
                  <input
                    type="range"
                    min={LOAN_LIMITS.TERM.MIN}
                    max={LOAN_LIMITS.TERM.MAX}
                    step={LOAN_LIMITS.TERM.STEP}
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0A4C76]"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>{LOAN_LIMITS.TERM.MIN} год</span>
                    <span>{LOAN_LIMITS.TERM.MAX} лет</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 lg:p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Результат расчёта
                </h3>

                <div className="space-y-6">
                  {/* Monthly Payment */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ежемесячный платёж</p>
                    <p className="text-4xl font-bold text-[#0A4C76]">
                      {formatNumber(calculation.monthlyPayment)} ₽
                    </p>
                  </div>

                  <div className="h-px bg-gray-200"></div>

                  {/* Total Payment */}
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Общая сумма выплат</p>
                      <p className="text-xl font-semibold text-gray-900">
                        {formatNumber(calculation.totalPayment)} ₽
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Переплата</p>
                      <p className="text-xl font-semibold text-amber-600">
                        {formatNumber(calculation.totalInterest)} ₽
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://studio.planometrica.pro"
                  className="mt-8 block w-full text-center py-4 px-6 bg-[#92CF93] text-[#0A4C76] font-semibold rounded-xl hover:bg-[#7BC17C] transition-colors"
                >
                  Подать заявку на ипотеку
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-white/60 text-sm mt-6">
            * Расчёт является предварительным. Точные условия зависят от банка и вашей кредитной истории.
          </p>
        </div>
      </div>
    </section>
  )
}

// Wrapper с Error Boundary для безопасного использования
export default function MortgageCalculator(props: MortgageCalculatorProps) {
  return (
    <MortgageErrorBoundary>
      <MortgageCalculatorInner {...props} />
    </MortgageErrorBoundary>
  )
}
