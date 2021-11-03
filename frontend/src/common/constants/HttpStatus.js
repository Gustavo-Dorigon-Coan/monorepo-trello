export const HttpStatus = {
  OK: 200,
  Created: 201,
  Unauthorized: 401,
  isOkRange: status => status >= 200 && status <= 299,
};