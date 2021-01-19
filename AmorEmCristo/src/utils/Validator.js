export default class Validator {

  static ERROR_EMPTY = 'Esse campo não pode ser vazio';
  static ERROR_WRONG_FORMAT = 'Formato inválido';
  static ERROR_MIN_CHAR = 'Valor informado muito curto';

  constructor(value) {
    this.value = value;
  }

  emailValid() {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(this.value).toLowerCase());
  }

	isNotEmpty() {
		return (this.value && this.value.length > 0);
	}

  passwordValid() {

    let strength = 0;
    let isStrongEnough = false;

    strength += /[A-Z]+/.test(this.value) ? 1 : 0;
    strength += /[a-z]+/.test(this.value) ? 1 : 0;
    strength += /[0-9]+/.test(this.value) ? 1 : 0;
    strength += /[\W]+/.test(this.value) ? 1 : 0;

    switch(strength) {
      case 3:
          isStrongEnough = true;
          break;
      case 4:
          isStrongEnough = true;
          break;
      default:
          isStrongEnough = false;
          break;
    }

    return isStrongEnough;
  }

  minCharValid(min) {
    return this.value.length >= min;
  }
}
