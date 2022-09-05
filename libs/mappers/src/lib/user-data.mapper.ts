import {Domain} from "@bigdeal/domain";
import {Application} from "@bigdeal/application";


export class UserData {

  static fromObjectToDomainModel(
    userDataDto: Application.UserDto
  ): Domain.UserData {

    const email = Domain.Email.create({
      value: userDataDto.email
    })

    return Domain.UserData.create({
      fullname: userDataDto.fullname,
      email
    })
  }

}

