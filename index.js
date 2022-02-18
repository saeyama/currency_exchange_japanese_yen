#!/usr/bin/env node
'use strict'

const Enquirer = require('enquirer')
const emoji = require('node-emoji')
const axios = require('axios')
const url = 'https://open.er-api.com/v6/latest/JPY'

async function getAllRateCountries () {
  const aaa = await axios.get(url)
  return aaa.data.rates
}

function rateCountries (rates, priceJPN) {
  const rateCountriesArr = {
    'AUD/オーストラリア(ドル)': (rates.AUD * priceJPN).toFixed(2) + 'ドル',
    'CAD/カナダ(ドル)': (rates.CAD * priceJPN).toFixed(2) + 'ドル',
    'CNY/中国(元)': (rates.CNY * priceJPN).toFixed(2) + '元',
    'EUR/ヨーロッパ(ユーロ)': (rates.EUR * priceJPN).toFixed(2) + 'ユーロ',
    'GBP/英国(ポンド)': (rates.GBP * priceJPN).toFixed(2) + 'ポンド',
    'HKD/香港(ドル)': (rates.HKD * priceJPN).toFixed(2) + 'ドル',
    'KRW/韓国(ウォン)': (rates.KRW * priceJPN).toFixed(2) + 'ウォン',
    'TWD/台湾(ドル)': (rates.TWD * priceJPN).toFixed(2) + 'ドル',
    'USD/アメリカ(ドル) ': (rates.USD * priceJPN).toFixed(2) + 'ドル'
  }
  return rateCountriesArr
}

async function datainput () {
  await Enquirer
  const select = await ([
    {
      type: 'input',
      name: 'name',
      message: '換算したい日本円をカンマなしで入力して下さい\nPlease enter the Japanese Yen you want to convert'
    }
  ])
  const inputPriceJPN = await Enquirer.prompt(select)
  return Number(inputPriceJPN.name)
}

async function currencySelect () {
  await Enquirer
  const priceJPN = await datainput()

  const bbb = await getAllRateCountries().then(rates => rateCountries(rates, priceJPN)).then(res => Object.keys(res))
  const eee = await getAllRateCountries().then(rates => rateCountries(rates, priceJPN))

  const select = await ([
    {
      type: 'select',
      name: 'memo',
      message: '換算したい通貨を選択して下さい\nPlease select the currency you want to convert',
      choices: bbb
    }
  ])
  const ddd = await Enquirer.prompt(select)
  console.log(`${priceJPN.toLocaleString()}円の換算金額 : ${eee[ddd.memo]}\nコロナが終わったら良い旅を${emoji.get('sparkles')}\nHave a nice trip when the covid19 is over ${emoji.get('small_airplane')}`)
}

currencySelect()
