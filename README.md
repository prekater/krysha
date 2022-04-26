import {UniqueEntityID} from "@bigdeal/domain";

// 1 per contract
export  class Term {
price: number;

// в день / в месяц - дефолт / в год
priceType: PriceType;

// от/до
srok: range ( от n  до m ) / fix ( n = m );

// дни, месяцы, годы
srokUnit: SrokUnit;


deposit: Deposit;

}


// дефолтные
export class Option {

title: string;
isEnabled: boolean;

}

//  управляется пользователем

export class UserTerm extends Term {

userId: UniqueEntityID;
}




export class Deposit extends ValueObject {

price: number;


collectType: DepositCollectType;

returnType: DepositReturnType;
}

export class Offer {


ID: UniqueEntityID;

option: Option[];
terms: Term[]
payment: Payment;
address: Address;
propertyType: PropertyType;

offerType: OfferType;



// если все поля заполнены, то можно опубликовать
publish()

toContract(): Contract;
}

export enum OfferType {
PUBLISHED,
DRAFT,
PAUSED
}



export enum DepositCollectType {
все_сразу_1_платеж,
разбить_на_2_платежа,
без_депозита_но_доплатить
}
export enum DepositReturnType {
удержан_полностью_при_разрыве_контракта,
депозит_будет_возвращен_в_случае_предупреждения_за_1мес,
пересчет_условий_аренды_в_соответствии_с_прожитым_сроком
}



export class Payment extends ValueObject {

type: 1 или 2 платежа
dateType: 1 числа каждый месяц или от начала контракта
fee: без штрафов, n (абс) за каждый просроченный день, без штрафных санкций за доп n в месяц




}

export class Address extends ValueObject{

city: string;
street: string;
house: string;
kv: string;



}

export enum PropertyType {
STUDIA,
1_комн,
2_комн,
3_комн,
4_комн,
5_комн,

}

// оффер становится контрактом


----------------------------------


Формула стоимости контракта: Term.price + Deposit   ( 2 цены - ежемемесячная и за депозит при нужном типе сразу  )











