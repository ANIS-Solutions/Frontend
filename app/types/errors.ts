interface ApiValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  status: string;
  message: string;
  errors?: ApiValidationError[];
}
