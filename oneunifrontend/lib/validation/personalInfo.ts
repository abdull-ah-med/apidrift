import { ProfileData } from "@/lib/schemas/profile";
import { 
  personalInfoSchema, 
  academicSchema, 
  additionalQualificationsSchema, 
  guardianSchema, 
  programPreferencesSchema, 
  documentsSchema 
} from "@/lib/schemas/profile";
import { z } from "zod";

export type InfoErrors = Partial<Record<keyof ProfileData | string, string>>;

const validateWithSchema = (schema: z.ZodType<any>, data: any): InfoErrors => {
  const result = schema.safeParse(data);
  if (result.success) return {};
  
  const errors: InfoErrors = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path[0] as string;
    errors[path] = issue.message;
  });
  return errors;
};

export function ValidatePersonalInfo(data: ProfileData) {
  return validateWithSchema(personalInfoSchema, data);
}

export function ValidateAcademicBackground(data: ProfileData) {
  return validateWithSchema(academicSchema, data);
}

export function ValidateAdditionalQualifications(data: ProfileData) {
  return validateWithSchema(additionalQualificationsSchema, data);
}

export function ValidateGuardianInformation(data: ProfileData) {
  return validateWithSchema(guardianSchema, data);
}

export function ValidateProgramPreferences(data: ProfileData) {
  return validateWithSchema(programPreferencesSchema, data);
}

export function ValidateDocuments(data: ProfileData) {
  return validateWithSchema(documentsSchema, data);
}

