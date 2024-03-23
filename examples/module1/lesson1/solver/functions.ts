export function add(a: number, b: number) {
  return {
    error: false,
    result: a + b,
  } as const;
}
export function subtract(a: number, b: number) {
  return {
    error: false,
    result: a - b,
  } as const;
}
export function multiply(a: number, b: number) {
  return {
    error: false,
    result: a * b,
  } as const;
}

export function divide(a: number, b: number) {
  if (b === 0) {
    return {
      error: true,
      result: 'Cannot divide by zero',
    } as const;
  }

  return {
    error: false,
    result: a / b,
  } as const;
}
