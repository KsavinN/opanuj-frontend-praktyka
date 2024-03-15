import {
  VALIDATION_ERROR_INVALID_INPUT,
  VALIDATION_FAILURE,
  VALIDATION_SUCCESS,
} from './messages';
import { type ValidatorNumberMethod } from './validatorMethods';

export function validator(
  input: string,
  validators: ValidatorNumberMethod[]
): string {
  const value = Number(input);
  if (isNaN(value) || !Number.isInteger(value) || input === '') {
    return VALIDATION_ERROR_INVALID_INPUT;
  }
  const validationResult = validators.every((validateFn) => validateFn(value));
  return validationResult ? VALIDATION_SUCCESS : VALIDATION_FAILURE;
}
