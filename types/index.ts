export type Gender = "MALE" | "FEMALE";
export type AdmissionStatus = "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED";
export type GalleryCategory = "CAMPUS" | "EVENTS" | "CLASSROOMS" | "SPORTS" | "LABS";
export type AdminRole = "SUPER_ADMIN" | "EDITOR";

export interface AdmissionRecord {
  id: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: Gender;
  classAppliedFor: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  studentPhotoUrl: string | null;
  birthCertUrl: string | null;
  status: AdmissionStatus;
  createdAt: string;
}

export interface GalleryItemRecord {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  caption: string | null;
  order: number;
}

export interface ClassFeeRecord {
  className: string;
  section: string | null;
  admissionFee: number;
  monthlyFee: number;
  annualCharges: number;
  securityFee: number;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
