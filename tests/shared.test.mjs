import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DAILY_EXP_CAP,
  getLevelInfo,
  getHigherVipTypes,
  calculateVipExpiration,
  splitTextWithLinks,
} from '../dist/index.js'

test('level and EXP rules work as expected', () => {
  assert.equal(DAILY_EXP_CAP, 1200)
  const lv1 = getLevelInfo(0)
  assert.equal(lv1.level, 1)
  assert.equal(lv1.dailyQuotaMinutes, 10)
})

test('VIP tier hierarchy returns strictly higher tiers', () => {
  assert.deepEqual(getHigherVipTypes('free'), ['vip_monthly', 'vip_half_year', 'vip_lifetime'])
  assert.deepEqual(getHigherVipTypes('vip_monthly'), ['vip_half_year', 'vip_lifetime'])
  assert.deepEqual(getHigherVipTypes('vip_half_year'), ['vip_lifetime'])
  assert.deepEqual(getHigherVipTypes('vip_lifetime'), [])
  assert.equal(calculateVipExpiration('vip_lifetime'), null)
})

test('splitTextWithLinks splits http(s) URLs safely', () => {
  const segs = splitTextWithLinks('请打开 https://pay.example.com/abc 完成支付')
  assert.equal(segs.length, 3)
  assert.equal(segs[1].isLink, true)
  assert.equal(segs[1].text, 'https://pay.example.com/abc')
})
