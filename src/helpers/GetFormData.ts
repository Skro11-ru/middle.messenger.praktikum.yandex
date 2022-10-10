export const getFormData = (selectorForm: string) => {
  const form = document.querySelector(`.${selectorForm}`) as HTMLDivElement;
  const inputs = form.querySelectorAll('input');
  const arrayForm: { login?: string; password?: string } = {};
  inputs.forEach((input: HTMLInputElement) => {
    // @ts-ignore
    arrayForm[input.name] = input.value;
  });

  // eslint-disable-next-line no-console
  console.log(arrayForm);

  return arrayForm;
};
