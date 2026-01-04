// lib/validation/validate.ts
import { z, ZodError, ZodObject } from "zod";
import { ProfileData } from "@/lib/schemas/profile"; // if this matches profileSchema
import {
  personalInfoSchema,
  academicSchema,
  additionalQualificationsSchema,
  guardianSchema,
  programPreferencesSchema,
  documentsSchema,
} from "@/lib/schemas/profile";

export type InfoErrors = Partial<Record<keyof ProfileData | string, string>>;

// generic converter: ZodError -> InfoErrors
function zodToInfoErrors(error: ZodError): InfoErrors {
    const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;
  const errors: InfoErrors = {};
  for (const key in fieldErrors) {
    const msg = fieldErrors[key]?.[0];
    if (msg) {
      errors[key] = msg;
    }
  }
  return errors;
}

// generic validator
function validateWithSchema<TSchema extends ZodObject<any>>(
  schema: TSchema,
  data: unknown
): { data: z.infer<TSchema> | null; errors: InfoErrors } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { data: result.data, errors: {} };
  }
  return { data: null, errors: zodToInfoErrors(result.error) };
}

// 🔹 Step-specific functions (like your previous ones)

export function ValidatePersonalInfo(data: ProfileData): InfoErrors {
  const { errors } = validateWithSchema(personalInfoSchema, data);
  return errors;
}

export function ValidateAcademicBackground(data: ProfileData): InfoErrors {
  const { errors } = validateWithSchema(academicSchema, data);
  return errors;
}

export function ValidateAdditionalQualifications(
  data: ProfileData
): InfoErrors {
  const { errors } = validateWithSchema(additionalQualificationsSchema, data);
  return errors;
}

export function ValidateGuardianInformation(data: ProfileData): InfoErrors {
  const { errors } = validateWithSchema(guardianSchema, data);
  return errors;
}

export function ValidateProgramPreferences(data: ProfileData): InfoErrors {
  const { errors } = validateWithSchema(programPreferencesSchema, data);
  return errors;
}

export function ValidateDocuments(data: ProfileData): InfoErrors {
  const { errors } = validateWithSchema(documentsSchema, data);
  return errors;
}
