import type { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
export interface ApiErrorResponse {
  errors: { message: string }[];
}

export type ApiError = AxiosError<ApiErrorResponse>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true &&
    "response" in error &&
    Array.isArray((error as ApiError).response?.data?.errors)
  );
}

export function handleApiError(error: unknown) {
  if (isApiError(error)) {
    const message = error.response?.data?.errors?.[0]?.message;
    toast.error(message || "Something went wrong");
  } else {
    toast.error("Unexpected error occurred");
    console.error(error);
  }
}
