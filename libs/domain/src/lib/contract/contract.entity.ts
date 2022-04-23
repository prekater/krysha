import {Price} from "./price.value-object";
import {OptionsCollection} from "./options.collection";
import {Option} from "./option.value-object";
import {UniqueEntityID} from "../core/unique-entity";
import {IAggregateRoot} from "../core/aggregate-root";

export class Contract implements IAggregateRoot{

  options: OptionsCollection;

  get id(): string {
    return this._id.toString()
  }

  get price(): number {
    return this._price.value + this.options.calculate()
  }

  private constructor(
    private readonly _authorId: string,
    private readonly _price: Price,
    public _id: UniqueEntityID = new UniqueEntityID()
  ) {
  }


  static Draft (authorId, price: Price): Contract {
    return new Contract(authorId, price)
  }

  public addOption (option: Option) {

  }


  public validate() {


    // negative sum of contract
  }

  public publish() {



  }


}
