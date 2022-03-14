export class UserEntity {
  constructor(
    readonly userId: number,
    readonly login: string,
    readonly password: string,
    readonly name: string,
    readonly email: string,
    readonly dateOfBirth: Date,
    readonly countryId: number,
  ) {}
}
