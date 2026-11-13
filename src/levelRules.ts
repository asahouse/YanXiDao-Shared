export type VipType = 'free' | 'vip_monthly' | 'vip_half_year' | 'vip_lifetime'

export interface LevelRuleItem {
  level: number
  title: string
  expToNext: number
  cumulativeExp: number
  dailyQuotaMinutes: number
}

export const DAILY_EXP_CAP = 1200
export const MAX_LEVEL = 30
export const VIP_EXP_MULTIPLIER = 1.25

export const VIP_TYPE_INFO: Record<VipType, { label: string; shortLabel: string; days: number | null; rank: number }> = {
  free: { label: '普通用户', shortLabel: '普通', days: null, rank: 0 },
  vip_monthly: { label: '月度 VIP', shortLabel: '月卡VIP', days: 30, rank: 1 },
  vip_half_year: { label: '半年 VIP', shortLabel: '半年VIP', days: 180, rank: 2 },
  vip_lifetime: { label: '终身 VIP', shortLabel: '终身VIP', days: null, rank: 3 },
}

export function getHigherVipTypes(currentVipType?: string | null): VipType[] {
  const currentRank = VIP_TYPE_INFO[(currentVipType as VipType) || 'free']?.rank ?? 0
  return (['vip_monthly', 'vip_half_year', 'vip_lifetime'] as VipType[]).filter(
    t => VIP_TYPE_INFO[t].rank > currentRank
  )
}

export const LEVEL_TABLE: LevelRuleItem[] = [
  { level: 1, title: '海岛新人', expToNext: 150, cumulativeExp: 0, dailyQuotaMinutes: 10 },
  { level: 2, title: '初探求知', expToNext: 350, cumulativeExp: 150, dailyQuotaMinutes: 13 },
  { level: 3, title: '晨曦学子', expToNext: 650, cumulativeExp: 500, dailyQuotaMinutes: 16 },
  { level: 4, title: '破晓行者', expToNext: 1000, cumulativeExp: 1150, dailyQuotaMinutes: 19 },
  { level: 5, title: '求知信使', expToNext: 1400, cumulativeExp: 2150, dailyQuotaMinutes: 22 },
  { level: 6, title: '敏捷语士', expToNext: 1550, cumulativeExp: 3550, dailyQuotaMinutes: 25 },
  { level: 7, title: '笃学行者', expToNext: 2050, cumulativeExp: 5100, dailyQuotaMinutes: 28 },
  { level: 8, title: '词海拾贝', expToNext: 2250, cumulativeExp: 7150, dailyQuotaMinutes: 31 },
  { level: 9, title: '思辨先锋', expToNext: 2850, cumulativeExp: 9400, dailyQuotaMinutes: 34 },
  { level: 10, title: '专注学者', expToNext: 3500, cumulativeExp: 12250, dailyQuotaMinutes: 37 },
  { level: 11, title: '研习标兵', expToNext: 3750, cumulativeExp: 15750, dailyQuotaMinutes: 40 },
  { level: 12, title: '词汇工匠', expToNext: 4500, cumulativeExp: 19500, dailyQuotaMinutes: 43 },
  { level: 13, title: '语境行者', expToNext: 5350, cumulativeExp: 24000, dailyQuotaMinutes: 46 },
  { level: 14, title: '卓越践行', expToNext: 6200, cumulativeExp: 29350, dailyQuotaMinutes: 49 },
  { level: 15, title: '语感宗师', expToNext: 7150, cumulativeExp: 35550, dailyQuotaMinutes: 52 },
  { level: 16, title: '精进贤达', expToNext: 8150, cumulativeExp: 42700, dailyQuotaMinutes: 55 },
  { level: 17, title: '语言博览', expToNext: 9250, cumulativeExp: 50850, dailyQuotaMinutes: 58 },
  { level: 18, title: '妙语连珠', expToNext: 10350, cumulativeExp: 60100, dailyQuotaMinutes: 61 },
  { level: 19, title: '睿智学者', expToNext: 11550, cumulativeExp: 70450, dailyQuotaMinutes: 64 },
  { level: 20, title: '海岛智囊', expToNext: 12800, cumulativeExp: 82000, dailyQuotaMinutes: 67 },
  { level: 21, title: '词韵领航', expToNext: 14150, cumulativeExp: 94800, dailyQuotaMinutes: 70 },
  { level: 22, title: '研习大师', expToNext: 15500, cumulativeExp: 108950, dailyQuotaMinutes: 73 },
  { level: 23, title: '荣耀长青', expToNext: 16950, cumulativeExp: 124450, dailyQuotaMinutes: 76 },
  { level: 24, title: '语言学者', expToNext: 18500, cumulativeExp: 141400, dailyQuotaMinutes: 79 },
  { level: 25, title: '海岛导师', expToNext: 20050, cumulativeExp: 159900, dailyQuotaMinutes: 82 },
  { level: 26, title: '博古通今', expToNext: 21700, cumulativeExp: 179950, dailyQuotaMinutes: 85 },
  { level: 27, title: '学贯中西', expToNext: 23400, cumulativeExp: 201650, dailyQuotaMinutes: 88 },
  { level: 28, title: '博识名宿', expToNext: 26150, cumulativeExp: 225050, dailyQuotaMinutes: 91 },
  { level: 29, title: '研习泰斗', expToNext: 31100, cumulativeExp: 251200, dailyQuotaMinutes: 94 },
  { level: 30, title: '岛境传奇', expToNext: 0, cumulativeExp: 282300, dailyQuotaMinutes: 97 },
]

export function getLevelInfo(exp: number) {
  const safeExp = Math.max(0, Math.floor(Number(exp) || 0))
  let current = LEVEL_TABLE[0]
  for (let i = LEVEL_TABLE.length - 1; i >= 0; i--) {
    if (safeExp >= LEVEL_TABLE[i].cumulativeExp) {
      current = LEVEL_TABLE[i]
      break
    }
  }
  const isMax = current.level >= MAX_LEVEL
  const expInCurrentLevel = safeExp - current.cumulativeExp
  const expRequiredForNext = isMax ? 0 : current.expToNext
  const progressPercent = isMax
    ? 100
    : Math.min(100, Math.max(0, Math.round((expInCurrentLevel / expRequiredForNext) * 100)))

  return {
    level: current.level,
    title: current.title,
    exp: safeExp,
    cumulativeExp: current.cumulativeExp,
    expInCurrentLevel,
    expRequiredForNext,
    expRemainingToNext: isMax ? 0 : Math.max(0, expRequiredForNext - expInCurrentLevel),
    progressPercent,
    dailyQuotaMinutes: current.dailyQuotaMinutes,
    dailyQuotaSeconds: current.dailyQuotaMinutes * 60,
    isMax,
  }
}

export function isVipActive(vipType?: string | null, vipExpireAt?: string | null, now = new Date()): boolean {
  if (!vipType || vipType === 'free') return false
  if (vipType === 'vip_lifetime') return true
  if (!vipExpireAt) return false
  const expireTime = new Date(vipExpireAt).getTime()
  if (isNaN(expireTime)) return false
  return expireTime > now.getTime()
}

export function getVipRemainingDays(vipType?: string | null, vipExpireAt?: string | null, now = new Date()): number | null {
  if (!isVipActive(vipType, vipExpireAt, now)) return 0
  if (vipType === 'vip_lifetime') return null
  if (!vipExpireAt) return 0
  const diffMs = new Date(vipExpireAt).getTime() - now.getTime()
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
}

export function calculateVipExpiration(vipType: VipType, baseDate = new Date()): string | null {
  if (vipType === 'free' || vipType === 'vip_lifetime') return null
  const days = VIP_TYPE_INFO[vipType]?.days || 30
  const target = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000)
  return formatLocalDateTime(target)
}

export function formatLocalDateTime(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export function getTodayDateStr(d = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
