import * as z from "zod";
import { PropertyTypeEnum } from "@/lib/constants";

export const propertySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),

  pricePerMonth: z.coerce.number().min(0),
  securityDeposit: z.coerce.number().min(0),
  applicationFee: z.coerce.number().min(0),

  isPetsAllowed: z.boolean(),
  isParkingIncluded: z.boolean(),

  photoUrls: z.array(z.instanceof(File)).optional(),

  amenities: z.string().min(1, "Amenities are required"),
  highlights: z.string().min(1, "Highlights are required"),

  beds: z.coerce.number().min(0).max(10),
  baths: z.coerce.number().min(0).max(10),
  squareFeet: z.coerce.number().positive(),

  propertyType: z.nativeEnum(PropertyTypeEnum),

  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
