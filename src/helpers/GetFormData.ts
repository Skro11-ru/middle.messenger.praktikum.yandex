export const getFormData = (selectorForm: string) => {
  const form = document.querySelector(`.${selectorForm}`) as HTMLDivElement;
  const inputs = form.querySelectorAll('input');
  const arrayForm: any = {};
  inputs.forEach((input: HTMLInputElement) => {
    arrayForm[input.name] = input.value;
  });

  return arrayForm;
};
