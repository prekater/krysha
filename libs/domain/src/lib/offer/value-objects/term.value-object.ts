import {PeriodUnit, TermProps} from "../interfaces/term.interface";
import {IEntity} from "../../core/entity";
import {UniqueEntityID} from "@bigdeal/domain";

// 1 per contract
export class Term implements IEntity {

  ID: UniqueEntityID;
  private props: TermProps;

  private constructor(props: TermProps, ID: UniqueEntityID) {

    this.ID = ID
    props.periodUnit = props.periodUnit || PeriodUnit.DAY

    this.props = props
  }

  get price() {
    return this.props.price
  }

  toObject() {
    return {
      ...this.props,
      ID: this.ID.toString(),
      deposit: this.props.deposit.toObject()
    }
  }

  static create(props: TermProps, ID: string = null) {
    return new Term(props, new UniqueEntityID(ID))
  }

}
