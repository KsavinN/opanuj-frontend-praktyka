function setValidator(validatorRule) {
  const input = document.getElementById('input');
  const validateButton = document.getElementById('validateButton');
  const clearInputButton = document.getElementById('clearInputButton');
  const resultOfValidation = document.getElementById('result');

  if (!input || !validateButton || !clearInputButton || !resultOfValidation) {
    console.error('Elements not found');
    return;
  }

  validateButton?.addEventListener('click', () => {
    const inputValue = input.value;
    const isValid = validatorRule(inputValue);
    resultOfValidation.innerHTML = isValid ? 'Valid' : 'Invalid';
  });

  clearInputButton.addEventListener('click', () => {
    input.value = '';
    resultOfValidation.innerHTML = '';
  });
}

function isBetween0And100(inputValue) {
  const value = Number(inputValue);
  const isInteger = Number.isInteger(value);
  if (isNaN(value) || !isInteger) {
    return false;
  }
  return value >= 0 && value <= 100;
}

setValidator(isBetween0And100);
