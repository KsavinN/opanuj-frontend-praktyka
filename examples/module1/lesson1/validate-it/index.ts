import { validator } from './validator';
import { isGreaterThan, isLessThan } from './validatorMethods';

function init() {
  const input = document.querySelector('input');
  const validateButton = document.querySelector('#validateButton');
  const clearInputButton = document.querySelector('#clearInputButton');
  const resultOfValidation = document.querySelector('#result');

  if (!input || !validateButton || !clearInputButton || !resultOfValidation) {
    console.error('Elements not found');
    return;
  }

  validateButton?.addEventListener('click', () => {
    const inputValue = input.value;
    const validationMessage = validator(inputValue, [
      isGreaterThan(0),
      isLessThan(100),
    ]);
    resultOfValidation.innerHTML = validationMessage;
  });

  clearInputButton.addEventListener('click', () => {
    input.value = '';
    resultOfValidation.innerHTML = '';
  });
}

init();
