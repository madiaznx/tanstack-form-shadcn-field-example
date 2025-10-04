export const formatFormError = (errors: (string | undefined)[]): ({ message?: string } | undefined)[] =>
  errors.map((error) => (error !== undefined ? { message: error } : undefined));
