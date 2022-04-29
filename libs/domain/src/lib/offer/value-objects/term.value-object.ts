import {PeriodUnit, TermProps} from "../interfaces/term.interface";
import {IEntity} from "../../core/entity";
import {UniqueEntityID} from "@bigdeal/domain";

// 1 per contract
export class Term implements IEntity {

  ID: UniqueEntityID;
  private props: TermProps;

  private constructor(props: TermProps, ID = new UniqueEntityID()) {

    this.ID = ID
    props.periodUnit = props.periodUnit || PeriodUnit.DAY

    this.props = props
  }

  get price() {
    return this.props.price
  }

  static create(props: TermProps) {
    return new Term(props)
  }

}
