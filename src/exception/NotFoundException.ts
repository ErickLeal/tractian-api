export default class NotFoundException extends Error {
    constructor(mensagem: string) {
      super(mensagem);
      this.name = 'NotFoundException';
    }
}