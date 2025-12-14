// lib/schemas/profile.ts
import { z } from "zod";

export const profileSchema = z.object({
  // Personal Info
  fullName: z.string().trim().min(1, "Full Name Required."),
  fatherName: z.string().trim().min(1, "Father Name Required"),
  cnic: z
    .string()
    .trim()
    .min(1, "CNIC Required")
    .regex(/^\d{5}-\d{7}-\d{1}$/, "Format: 12345-1234567-1"),
  dateOfBirth: z.string().min(1, "Date Required"),
  gender: z.string().min(1, "Gender Required"),
  phone: z.string().trim().min(1, "Phone Required"),
  email: z
    .string()
    .trim()
    .min(1, "Email Required")
    .email("Invalid email"),
  photo: z.custom<File>().nullable(),

  // Academic Background
  matricInstitute: z.string().trim().min(1, "Required"),
  matricBoard: z.string().trim().min(1, "Required"),
  matricYear: z.string().trim().min(1, "Required"),
  matricMarks: z.string().trim().min(1, "Required"),
  matricTotalMarks: z.string().trim().min(1, "Required"),

  interInstitute: z.string().trim().min(1, "Required"),
  interBoard: z.string().trim().min(1, "Required"),
  interYear: z.string().trim().min(1, "Required"),
  interMarks: z.string().trim().min(1, "Required"),
  interTotalMarks: z.string().trim().min(1, "Required"),

  // Additional Qualifications
  hasDisability: z.string(),
  disabilityType: z.string().trim().optional(),
  isHafiz: z.string(),
  sportsQuota: z.string(),
  sportType: z.string().trim().optional(),

  // Family & Financial
  guardianRelation: z.string().min(1, "Guardian Relation Required"),
  guardianName: z.string().trim().min(1, "Guardian Name Required"),
  guardianPhone: z.string().trim().min(1, "Guardian Phone Required"),
  guardianCNIC: z
    .string()
    .trim()
    .min(1, "Guardian CNIC Required")
    .regex(/^\d{5}-\d{7}-\d{1}$/, "Format: 12345-1234567-1"),
  permanentAddress: z.string().trim().min(1, "Address Required"),
  city: z.string().trim().min(1, "City is Required"),
  annualIncome: z.string().min(1, "Annual Income Required"),

  // Program Preferences
  interestedCity: z.string().min(1, "City preference is required"),
  preferredDegrees: z
    .array(z.string())
    .min(1, "Add at least one degree"),
  preferredUniversities: z
    .array(z.string())
    .min(1, "Add at least one university"),
  shift: z.string().min(1, "Shift preference is required"),

  // Documents
  cnicDoc: z.custom<File | null>().refine((file) => !!file, { message: "Required" }),
  matricDoc: z.custom<File | null>().refine((file) => !!file, { message: "Required" }),
  interDoc: z.custom<File | null>().refine((file) => !!file, { message: "Required" }),
  domicileDoc: z.custom<File | null>().refine((file) => !!file, { message: "Required" }),
});

// 🔹 conditional rules (extra) for disability/sports
export const additionalQualificationsSchema = profileSchema
  .pick({
    hasDisability: true,
    disabilityType: true,
    isHafiz: true,
    sportsQuota: true,
    sportType: true,
  })
  .superRefine((values, ctx) => {
    if (values.hasDisability === "yes" && !values.disabilityType?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["disabilityType"],
        message: "Required",
      });
    }
    if (values.sportsQuota === "yes" && !values.sportType?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["sportType"],
        message: "Required",
      });
    }
  });

// 🔹 per-step schemas (no messages here; they come from profileSchema)
export const personalInfoSchema = profileSchema.pick({
  fullName: true,
  fatherName: true,
  cnic: true,
  dateOfBirth: true,
  gender: true,
  phone: true,
  email: true,
});

export const academicSchema = profileSchema.pick({
  matricInstitute: true,
  matricBoard: true,
  matricYear: true,
  matricMarks: true,
  matricTotalMarks: true,
  interInstitute: true,
  interBoard: true,
  interYear: true,
  interMarks: true,
  interTotalMarks: true,
});

export const guardianSchema = profileSchema.pick({
  guardianRelation: true,
  guardianName: true,
  guardianPhone: true,
  guardianCNIC: true,
  permanentAddress: true,
  city: true,
  annualIncome: true,
});

export const programPreferencesSchema = profileSchema.pick({
  interestedCity: true,
  preferredDegrees: true,
  preferredUniversities: true,
  shift: true,
});

export const documentsSchema = profileSchema.pick({
  cnicDoc: true,
  matricDoc: true,
  interDoc: true,
  domicileDoc: true,
});

export type ProfileData = z.infer<typeof profileSchema>;

