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
          "period": "3",
          "value": "145000"
        },
        {
          "period": "6",
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
          "period": "3",
          "value": "160000"
        },
        {
          "period": "6",
          "value": "140000"
        },
        {
          "period": "9",
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
          "period": "6",
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
