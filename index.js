#!/usr/bin/env node
'use strict'

const Enquirer = require('enquirer')
const emoji = require('node-emoji')
const axios = require('axios')
const url = 'https://open.er-api.com/v6/latest/JPY'

async function getJpyConversionRateAllCurrencies () {
  const currencyInfo = await axios.get(url)
  return currencyInfo.data.rates
}

function selectConversionRates (rates, priceJpy) {
  const conversionRatesObject = {
    'AUD/オーストラリア(ドル)': (rates.AUD * priceJpy).toFixed(2) + 'ドル',
    'CAD/カナダ(ドル)': (rates.CAD * priceJpy).toFixed(2) + 'ドル',
    'CNY/中国(元)': (rates.CNY * priceJpy).toFixed(2) + '元',
    'EUR/ヨーロッパ(ユーロ)': (rates.EUR * priceJpy).toFixed(2) + 'ユーロ',
    'GBP/英国(ポンド)': (rates.GBP * priceJpy).toFixed(2) + 'ポンド',
    'HKD/香港(ドル)': (rates.HKD * priceJpy).toFixed(2) + 'ドル',
    'KRW/韓国(ウォン)': (rates.KRW * priceJpy).toFixed(2) + 'ウォン',
    'TWD/台湾(ドル)': (rates.TWD * priceJpy).toFixed(2) + 'ドル',
    'USD/アメリカ(ドル) ': (rates.USD * priceJpy).toFixed(2) + 'ドル'
  }
  return conversionRatesObject
}

async function inputJpy () {
  await Enquirer
  const inputJpyInteger = await
  {
    type: 'input',
    name: 'integer',
    message: '換算したい日本円を半角数字でカンマなしで入力して下さい\nPlease enter the Japanese Yen you want to convert'
  }
  const inputpriceJpy = await Enquirer.prompt(inputJpyInteger)
  return Number(inputpriceJpy.integer)
}

async function resultSelectConversionAmount () {
  await Enquirer
  const priceJpy = await inputJpy()

  const currencyNames = await getJpyConversionRateAllCurrencies().then(rates => selectConversionRates(rates, priceJpy)).then(res => Object.keys(res))
  const currencyDatas = await getJpyConversionRateAllCurrencies().then(rates => selectConversionRates(rates, priceJpy))

  const selectCurrencyName = await
  {
    type: 'select',
    name: 'currencyName',
    message: '換算したい通貨を選択して下さい\nPlease select the currency you want to convert',
    choices: currencyNames
  }
  const select = await Enquirer.prompt(selectCurrencyName)
  console.log(`${priceJpy.toLocaleString()}円の換算金額 : ${currencyDatas[select.currencyName]}\nコロナが終わったら良い旅を${emoji.get('sparkles')}\nHave a nice trip when the covid19 is over ${emoji.get('small_airplane')}`)
}

resultSelectConversionAmount()
