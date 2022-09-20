interface IFormData {
  login?: string;
  password?: string;
}
const validationRules: Record<string, { rule: RegExp; error: string }> = {
  login: {
    rule: /^[\w-]{3,20}$/,
    error: 'Латиница, цифры, дефис и нижнее подчёркивание. 3-20 символов',
  },
  password: {
    rule: /^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]{6,40}$/,
    error: 'Обязательно хотя бы одна заглавная буква и цифра. 6-40 символов',
  },
  password_again: {
    rule: /^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]{6,40}$/,
    error: 'Обязательно хотя бы одна заглавная буква и цифра. 6-40 символов',
  },
  email: {
    rule: /^[^\s@]+@[^\s@]+\.\S{2,}$/,
    error: 'Латиница, цифры и спецсимволы. От 2 символов',
  },
  phone: {
    rule: /^\+*\({0,1}\d{1,3}\){0,1}[\d\s./-]*$/,
    error: 'Цифры, допускается в начале "плюс". 6-40 символов',
  },
  first_name: {
    rule: /^[A-ZЁА-Я][A-Za-zЁА-яё-]+$/,
    error:
      'Первая буква должна быть заглавной, не допускаются пробелы, цифры и спецсимволы',
  },
  second_name: {
    rule: /^[A-ZЁА-Я][A-Za-zЁА-яё-]+$/,
    error:
      'Первая буква должна быть заглавной, не допускаются пробелы, цифры и спецсимволы',
  },
};

const showErrorMessage = (nameElement: string, error: string) => {
  const checkSpanExist = document.querySelector(`.input-id-${nameElement}`);
  if (!checkSpanExist) {
    const input = document.querySelector(`#${nameElement}`);
    const parent = input?.parentNode;
    const span = document.createElement('span');
    span.classList.add('input__error', `input-id-${nameElement}`);
    span.innerHTML = error;
    parent?.append(span);
  }
};

const removeErrorMessage = (nameElement: string) => {
  const span = document.querySelector(`.input-id-${nameElement}`);
  if (span) {
    span.remove();
  }
};

export const inputValidation = (nameElement: string, valueInput: string) => {
  const pattern = validationRules[nameElement].rule;
  const regExp = new RegExp(pattern);
  const isValid = regExp.test(String(valueInput));
  if (!isValid) {
    showErrorMessage(nameElement, validationRules[nameElement].error);
    return false;
  }
  removeErrorMessage(nameElement);
  return true;
};

export const formValidation = (selectorForm: string) => {
  const form = document.querySelector(`.${selectorForm}`) as HTMLDivElement;
  const inputs = form.querySelectorAll('input');
  const arrayForm: IFormData = {};

  inputs.forEach((input: HTMLInputElement) => {
    inputValidation(input.name, input.value);
  });

  const spans = form.querySelectorAll('span');
  const numberErrors = spans.length > 0 ? spans.length : 0;
  if (numberErrors) {
    showErrorMessage(selectorForm, 'Все поля должны быть заполнены');
    return false;
  }
  inputs.forEach((input: HTMLInputElement) => {
    arrayForm[input.name] = input.value;
  });

  // eslint-disable-next-line no-console
  console.log(arrayForm);
  return true;
};
