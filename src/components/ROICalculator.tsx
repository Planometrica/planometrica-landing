import { useState, useMemo } from 'react'

interface Inputs {
  projectsPerMonth: number
  avgArea: number
  pricePerSqm: number
  teamSize: number
  growthPercent: number
}

const DEFAULT_INPUTS: Inputs = {
  projectsPerMonth: 4,
  avgArea: 180,
  pricePerSqm: 800,
  teamSize: 3,
  growthPercent: 50,
}

/** Стоимость подписки ПРО (руб/мес) — до 5 пользователей */
const PLAN_COST_PRO = 33_200
/** Стоимость подписки Старт (руб/мес) — 1 пользователь */
const PLAN_COST_START = 14_900
/** Стоимость подписки Компания (руб/мес) — 10+ пользователей */
const PLAN_COST_COMPANY = 80_000

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString('ru-RU')
}

function formatCurrency(n: number): string {
  if (Math.abs(n) >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace('.0', '')} млн ₽`
  }
  return `${formatNumber(n)} ₽`
}

function getPlanCost(teamSize: number): { cost: number; name: string } {
  if (teamSize <= 1) return { cost: PLAN_COST_START, name: 'Старт' }
  if (teamSize <= 5) return { cost: PLAN_COST_PRO, name: 'ПРО' }
  return { cost: PLAN_COST_COMPANY, name: 'Компания' }
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS)

  const update = (key: keyof Inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const results = useMemo(() => {
    const { projectsPerMonth, avgArea, pricePerSqm, teamSize, growthPercent } = inputs

    // Выручка за 1 проект
    const revenuePerProject = avgArea * pricePerSqm

    // Текущая выручка
    const currentRevenuePerMonth = projectsPerMonth * revenuePerProject

    // С ПланоCAD: рост загрузки на growthPercent%
    const additionalProjects = projectsPerMonth * (growthPercent / 100)
    const newProjectsPerMonth = projectsPerMonth + additionalProjects
    const newRevenuePerMonth = newProjectsPerMonth * revenuePerProject

    // Стоимость подписки
    const plan = getPlanCost(teamSize)
    const planCostPerMonth = plan.cost

    // Дополнительная выручка = новая - текущая - подписка
    const additionalRevenuePerMonth = newRevenuePerMonth - currentRevenuePerMonth - planCostPerMonth
    const additionalRevenuePerYear = additionalRevenuePerMonth * 12

    // ROI = доп. выручка за год / стоимость подписки за год × 100
    const annualPlanCost = planCostPerMonth * 12
    const roi = annualPlanCost > 0 ? (additionalRevenuePerYear / annualPlanCost) * 100 : 0

    // Окупаемость (месяцев)
    const grossAdditionalPerMonth = newRevenuePerMonth - currentRevenuePerMonth
    const paybackMonths = grossAdditionalPerMonth > 0 ? planCostPerMonth / grossAdditionalPerMonth : Infinity

    return {
      revenuePerProject,
      currentRevenuePerMonth,
      additionalProjects: Math.round(additionalProjects * 10) / 10,
      newProjectsPerMonth: Math.round(newProjectsPerMonth * 10) / 10,
      additionalRevenuePerMonth,
      additionalRevenuePerYear,
      roi,
      paybackMonths,
      planCostPerMonth,
      planName: plan.name,
    }
  }, [inputs])

  const sliders: {
    key: keyof Inputs
    label: string
    min: number
    max: number
    step: number
    formatValue: (v: number) => string
  }[] = [
    {
      key: 'projectsPerMonth',
      label: 'Проектов в месяц',
      min: 1,
      max: 30,
      step: 1,
      formatValue: (v) => `${v}`,
    },
    {
      key: 'avgArea',
      label: 'Средняя площадь проекта',
      min: 60,
      max: 500,
      step: 10,
      formatValue: (v) => `${formatNumber(v)} м²`,
    },
    {
      key: 'pricePerSqm',
      label: 'Стоимость проектирования',
      min: 200,
      max: 3000,
      step: 50,
      formatValue: (v) => `${formatNumber(v)} ₽/м²`,
    },
    {
      key: 'teamSize',
      label: 'Размер команды',
      min: 1,
      max: 20,
      step: 1,
      formatValue: (v) => `${v} чел.`,
    },
    {
      key: 'growthPercent',
      label: 'Рост загрузки с ПланоCAD',
      min: 10,
      max: 200,
      step: 10,
      formatValue: (v) => `+${v}%`,
    },
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Ваши параметры</h3>
        <div className="space-y-4">
          {sliders.map(({ key, label, min, max, step, formatValue }) => (
            <div key={key}>
              <div className="flex justify-between items-baseline mb-1.5">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <span className="text-base font-bold text-[#0A4C76]">{formatValue(inputs[key])}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={inputs[key]}
                onChange={(e) => update(key, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#0A4C76]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                <span>{formatValue(min)}</span>
                <span>{formatValue(max)}</span>
              </div>
            </div>
          ))}

          {/* Derived info */}
          <div className="pt-3 border-t border-gray-100 space-y-1.5">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Выручка за 1 проект</span>
              <span className="font-medium text-gray-700">{formatCurrency(results.revenuePerProject)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Текущая выручка / мес</span>
              <span className="font-medium text-gray-700">{formatCurrency(results.currentRevenuePerMonth)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Тариф</span>
              <span className="font-medium text-gray-700">
                {results.planName} — {formatCurrency(results.planCostPerMonth)}/мес
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Main result card */}
        <div className="bg-gradient-to-br from-[#0A4C76] to-[#1A7BB3] rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-lg font-medium text-white/80 mb-4">Дополнительная выручка в год</h3>
          <div className="text-4xl md:text-5xl font-bold mb-2">
            {results.additionalRevenuePerYear > 0 ? formatCurrency(results.additionalRevenuePerYear) : '—'}
          </div>
          <p className="text-white/60 text-sm">
            +{results.additionalProjects} проектов/мес за счёт ускорения проектирования
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Проектов / мес</div>
            <div className="text-2xl font-bold text-[#0A4C76]">
              {inputs.projectsPerMonth} → {results.newProjectsPerMonth}
            </div>
            <div className="text-sm text-gray-500">+{inputs.growthPercent}% загрузки</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Доп. выручка</div>
            <div className="text-2xl font-bold text-[#0A4C76]">
              {results.additionalRevenuePerMonth > 0 ? formatCurrency(results.additionalRevenuePerMonth) : '—'}
            </div>
            <div className="text-sm text-gray-500">в месяц (минус подписка)</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">ROI</div>
            <div className={`text-2xl font-bold ${results.roi > 0 ? 'text-[#92CF93]' : 'text-gray-400'}`}>
              {results.roi > 0 ? `${formatNumber(results.roi)}%` : '—'}
            </div>
            <div className="text-sm text-gray-500">возврат инвестиций</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Окупаемость</div>
            <div
              className={`text-2xl font-bold ${results.paybackMonths < 1 ? 'text-[#92CF93]' : 'text-[#0A4C76]'}`}
            >
              {results.paybackMonths <= 12
                ? results.paybackMonths < 1
                  ? '< 1 мес'
                  : `${Math.ceil(results.paybackMonths)} мес`
                : '> 12 мес'}
            </div>
            <div className="text-sm text-gray-500">до возврата вложений</div>
          </div>
        </div>

        {/* CTA */}
        <a
          href="/planocad-demo"
          className="flex items-center justify-center w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#0A4C76] to-[#1A7BB3] rounded-xl hover:from-[#093d5f] hover:to-[#156999] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Запросить демо
          <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>

        {/* Methodology note */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Методология расчёта</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Расчёт основан на указанных вами параметрах проектирования. Дополнительная выручка рассчитывается
            как прирост числа проектов за счёт ускорения работы в ПланоCAD, за вычетом стоимости подписки.
            ROI = (доп. выручка за год / стоимость подписки за год) × 100%.
            Фактические результаты зависят от специфики вашей практики.
          </p>
        </div>
      </div>
    </div>
  )
}
