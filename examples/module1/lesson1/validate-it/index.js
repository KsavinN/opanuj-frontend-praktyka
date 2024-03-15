function validator() {
  const input = document.getElementById('input');
  const validateButton = document.getElementById('validateButton');
  const clearInputButton = document.getElementById('clearInputButton');
  const result = document.getElementById('result');

  if (!input || !validateButton || !clearInputButton || !result) {
    console.error('Elements not found');
    return;
  }

  validateButton?.addEventListener('click', () => {
    const value = Number(input.value);
    console.log('input.value', typeof value, value);
    if (!isNaN(value)) {
      if (Number.isInteger(value)) {
        if (Number(value) >= 0 && Number(value) <= 100) {
          result.innerHTML = 'Valid';
        } else {
          result.innerHTML = 'Invalid';
        }
        result.innerHTML = 'Valid';
      } else {
        result.innerHTML = 'Invalid';
      }
    } else {
      result.innerHTML = 'Invalid';
    }
  });

  clearInputButton.addEventListener('click', () => {
    input.value = '';
    result.innerHTML = '';
  });
}

validator();
