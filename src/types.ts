import type { VipType } from './levelRules.js'

export interface UserProfile {
  id: string
  nickname: string
  avatar: string
  role: string
  email?: string
  phone?: string
  status?: 'active' | 'disabled' | string
  totalStudySeconds: number
  todayStudySeconds: number
  monthStudySeconds: number
  totalSentenceCount: number
  todaySentenceCount: number
  continuousDays: number
  lastCheckinDate?: string | null
  hasCheckedInToday?: boolean
  // Level & VIP fields
  exp: number
  level: number
  todayExp?: number
  vipType: VipType
  vipExpireAt?: string | null
  hasEverVip?: boolean
  lastVipType?: VipType | null
  todayUsedSeconds: number
  mustChangePassword?: boolean
  // Computed helpers returned from server or computed locally
  isVipActive?: boolean
  vipRemainingDays?: number | null
  dailyQuotaSeconds?: number
}

export interface PurchaseRecord {
  id: string
  orderNo: string
  courseName: string
  purchaseTime: string
  amount: number
  status: 'completed' | 'refunded'
}

export interface MenuItemConfig {
  id: string
  label: string
  iconName: string
  path: string
  order: number
  isEnabled: boolean
  isSystemDefault: boolean
}

export type CourseCategory = 'all' | 'zero' | 'intro' | 'elementary' | 'intermediate' | 'advanced' | 'master' | string

export type SchoolLevel = 'all' | 'primary' | 'junior' | 'senior' | 'college' | string

export interface CourseCategoryItem {
  id: string
  catKey: string
  name: string
  orderNum: number
  isEnabled: boolean
  courseCount?: number
}

export interface GradeItem {
  id: string
  levelKey: string
  gradeValue: number
  name: string
  orderNum: number
  isEnabled: boolean
  teachingCount?: number
}

export interface SchoolLevelItem {
  id: string
  levelKey: string
  name: string
  orderNum: number
  isEnabled: boolean
  teachingCount?: number
  grades: GradeItem[]
}

export interface CourseItem {
  id: string
  title: string
  instructor: {
    name: string
    avatar: string
  }
  lessonCount: number
  completedLessons: number
  cover: string
  category: CourseCategory
  isFavorite: boolean
  type: 'course' | 'teaching'
  schoolLevel?: SchoolLevel
  grade?: number
  orderNum?: number
}

export interface WordToken {
  index: number
  word: string
  meaning: string
  phonetic: string
  posTag?: string // e.g. 话语标记, 表语, 定语, 呼语
}

export interface SentenceItem {
  index: number
  sentenceEn: string
  sentenceCn: string
  words: WordToken[]
  imageUrl?: string
}

export interface CourseCategoryItem {
  id: string
  courseId: string
  name: string
  orderNum: number
}

export interface LessonItem {
  id: string
  courseId: string
  categoryId?: string
  lessonNumber: number
  titleEn: string
  titleCn: string
  practiceTimeSeconds: number
  completedCount: number
  sentenceCount?: number
  isRecent: boolean
  sentences: SentenceItem[]
}

export type PracticeMode = 'typing' | 'puzzle' | 'dictation' | 'translation'

export interface TTSVoiceOption {
  id: string
  name: string
  gender: 'female' | 'male'
  locale: string
}

export interface PronunciationSettings {
  voice: string
  autoReadOnSwitch: boolean
  autoReadOnCorrect: boolean
  repeatCount: number
  repeatIntervalSeconds: number
  speed: number
  volume: number
}

export interface SoundEffectItem {
  enabled: boolean
  type: string
  volume: number
}

export interface SoundSettings {
  typing: SoundEffectItem
  switchQuestion: SoundEffectItem
  answerCorrect: SoundEffectItem
  answerError: SoundEffectItem
  courseCompleted: SoundEffectItem
}

export interface AnswerSettings {
  autoNextOnCorrect: boolean
  autoAdvanceGrid: boolean
  resetOnModeSwitch: boolean
  autoShowAnswerModal: boolean
  errorThresholdForAnswer: number // 1, 2, 3, 5, or -1 for never
}

export interface PersonalizationSettings {
  inputTextColor: string
  practiceTextColor: string
  practiceBgColor: string
  cardBgColor: string
  confettiEnabled: boolean
  fontSizeInput: 'min' | 'small' | 'default' | 'medium' | 'large' | 'max'
  fontSizeResult: 'min' | 'small' | 'default' | 'medium' | 'large' | 'max'
  theme?: 'dark' | 'light'
}

export interface AppSettings {
  pronunciation: PronunciationSettings
  sound: SoundSettings
  answer: AnswerSettings
  personalization: PersonalizationSettings
}

export interface ReviewItem {
  id: string
  userId?: string
  sentenceEn: string
  sentenceCn: string
  phonetic: string
  words: WordToken[]
  courseTitle: string
  createdAt: string
  source: 'error' | 'unfamiliar'
  errorCount: number
  isLearned?: boolean
}
