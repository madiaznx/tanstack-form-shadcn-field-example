/* 
If not using zod, use this function to process field.state.meta.errors to fit the types of Shadcn <FieldError /> component.
*/

export const formatFormError = (errors: (string | undefined)[]): ({ message?: string } | undefined)[] =>
  errors.map((error) => (error !== undefined ? { message: error } : undefined));
