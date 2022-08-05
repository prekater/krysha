export const createOfferPayload1 = {
  "address": {
    "city": "Москва",
    "street": "улица Свободы",
    "house": "56",
    "flat": "222",
    cadastralNumber: '1231432425'

  },
  "meta": {
    "propertyType": "ONE_ROOM"
  },
  "options": [
    {
      "title": "Электричество",
      "isEnabled": false
    },
    {
      "title": "Кондиционер",
      "isEnabled": true
    },
    {
      "title": "Телевизор",
      "isEnabled": true
    },
    {
      "title": "Интернет",
      "isEnabled": false
    }
  ],
  "terms": [
    {
      "deposit": {
        "returnPeriod": "",
        "isEnabled": true,
        "returnPeriodUnit": "",
        "value": "100000",
        "returnType": "RECALCULATE_PRICE",
        "collectOptions": [
          {
            "type": "ABSENT_WITH_EXTRA_CHARGE",
            "priceAffect": "10000",
            "isEnabled": true
          },
          {
            "type": "PARTIAL",
            "priceAffect": "2000",
            "isEnabled": true
          }
        ]
      },
      "periodFrom": "1",
      "periodTo": "3",
      "periodUnit": "days",
      "price": "100000",
      "priceUnit": "RUB",
      "ID": "4578b396-cd7a-4e2c-8c1e-ac83eb1d030d",
      "terminationRules": [
        {
          "currency": "RUB",
          "period": "3",
          "periodUnit": "months",
          "value": "145000"
        },
        {
          "currency": "RUB",
          "period": "6",
          "periodUnit": "months",
          "value": "150000"
        }
      ]
    },
    {
      "deposit": {
        "returnPeriod": "",
        "isEnabled": true,
        "returnPeriodUnit": "",
        "value": "100000",
        "returnType": "RECALCULATE_PRICE",
        "collectOptions": [
          {
            "type": "ABSENT_WITH_EXTRA_CHARGE",
            "priceAffect": 0,
            "isEnabled": false
          },
          {
            "type": "PARTIAL",
            "priceAffect": "2000",
            "isEnabled": true
          }
        ]
      },
      "periodFrom": "3",
      "periodTo": "6",
      "periodUnit": "months",
      "price": "90000",
      "priceUnit": "RUB",
      "ID": "0aef4f7b-eb11-418c-8224-bb78b448f4df",
      "terminationRules": [
        {
          "currency": "RUB",
          "period": "3",
          "periodUnit": "months",
          "value": "160000"
        },
        {
          "currency": "RUB",
          "period": "6",
          "periodUnit": "months",
          "value": "140000"
        },
        {
          "currency": "RUB",
          "period": "9",
          "periodUnit": "months",
          "value": "120000"
        }
      ]
    },
    {
      "deposit": {
        "returnPeriod": "",
        "isEnabled": true,
        "returnPeriodUnit": "",
        "value": "100000",
        "returnType": "RECALCULATE_PRICE",
        "collectOptions": [
          {
            "type": "ABSENT_WITH_EXTRA_CHARGE",
            "priceAffect": 0,
            "isEnabled": false
          },
          {
            "type": "PARTIAL",
            "priceAffect": 0,
            "isEnabled": false
          }
        ]
      },
      "periodFrom": "6",
      "periodTo": "12",
      "periodUnit": "months",
      "price": "90000",
      "priceUnit": "RUB",
      "ID": "e46775d9-58f2-4ca1-9ab9-65e6754939c0",
      "terminationRules": [
        {
          "currency": "RUB",
          "period": "6",
          "periodUnit": "months",
          "value": "110000"
        }
      ]
    }
  ],
  "authorId": "weofkwpfokw",
  "payment": {
    "paymentStartOptions": [
      {
        "type": "START_OF_RENT",
        "isEnabled": true
      },
      {
        "type": "START_OF_MONTH",
        "isEnabled": true
      }
    ],
    "paymentTypeOptions": [
      {
        "type": "TWO_PAYMENTS",
        "priceAffect": 2000,
        "isEnabled": true
      },
      {
        "type": "ONE_PAYMENT",
        "priceAffect": 0,
        "isEnabled": true
      }
    ]
  }
}
