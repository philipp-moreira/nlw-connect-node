import { ExpectedError } from './expected-error'

export class EmailAlreadyExists extends ExpectedError {
  constructor() {
    super('E-mail já cadastrado! Só é possível fazer a inscrição uma vez.')
  }
}
