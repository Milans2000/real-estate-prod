"use client";

import { CustomFormField } from "@/components/FormField";
import Header from "@/components/Header";
import { Form } from "@/components/ui/form";
import { propertySchema } from "@/lib/schemas";
import { useCreatePropertyMutation, useGetAuthUserQuery } from "@/state/api";
import { AmenityEnum, HighlightEnum, PropertyTypeEnum } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const NewProperty = () => {
  const [createProperty] = useCreatePropertyMutation();
  const { data: authUser } = useGetAuthUserQuery();

  // ✅ DO NOT pass generic to useForm
  const form = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      description: "",
      pricePerMonth: 1000,
      securityDeposit: 500,
      applicationFee: 100,
      isPetsAllowed: true,
      isParkingIncluded: true,
      photoUrls: [],
      amenities: "",
      highlights: "",
      beds: 1,
      baths: 1,
      squareFeet: 1000,
      propertyType: PropertyTypeEnum.Apartment,
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });

  // ✅ Let RHF infer type
  const onSubmit = async (data: any) => {
    if (!authUser?.cognitoInfo?.userId) {
      throw new Error("No manager ID found");
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "photoUrls" && Array.isArray(value)) {
        value.forEach((file: File) => {
          formData.append("photos", file);
        });
      } else {
        formData.append(key, String(value));
      }
    });

    formData.append("managerCognitoId", authUser.cognitoInfo.userId);

    await createProperty(formData);
  };

  return (
    <div className="dashboard-container">
      <Header
        title="Add New Property"
        subtitle="Create a new property listing with detailed information"
      />

      <div className="bg-white rounded-xl p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 space-y-10"
          >
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <CustomFormField name="name" label="Property Name" />
                <CustomFormField
                  name="description"
                  label="Description"
                  type="textarea"
                />
              </div>
            </div>

            <hr />

            {/* Fees */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Fees</h2>
              <CustomFormField
                name="pricePerMonth"
                label="Price per Month"
                type="number"
              />
              <div className="grid grid-cols-2 gap-4">
                <CustomFormField
                  name="securityDeposit"
                  label="Security Deposit"
                  type="number"
                />
                <CustomFormField
                  name="applicationFee"
                  label="Application Fee"
                  type="number"
                />
              </div>
            </div>

            <hr />

            {/* Property Details */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-3 gap-4">
                <CustomFormField name="beds" label="Beds" type="number" />
                <CustomFormField name="baths" label="Baths" type="number" />
                <CustomFormField
                  name="squareFeet"
                  label="Square Feet"
                  type="number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CustomFormField
                  name="isPetsAllowed"
                  label="Pets Allowed"
                  type="switch"
                />
                <CustomFormField
                  name="isParkingIncluded"
                  label="Parking Included"
                  type="switch"
                />
              </div>

              <CustomFormField
                name="propertyType"
                label="Property Type"
                type="select"
                options={Object.keys(PropertyTypeEnum).map((type) => ({
                  value: type,
                  label: type,
                }))}
              />
            </div>

            <hr />

            {/* Amenities */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">
                Amenities and Highlights
              </h2>
              <CustomFormField
                name="amenities"
                label="Amenities"
                type="select"
                options={Object.keys(AmenityEnum).map((a) => ({
                  value: a,
                  label: a,
                }))}
              />
              <CustomFormField
                name="highlights"
                label="Highlights"
                type="select"
                options={Object.keys(HighlightEnum).map((h) => ({
                  value: h,
                  label: h,
                }))}
              />
            </div>

            <hr />

            {/* Photos */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Photos</h2>
              <CustomFormField
                name="photoUrls"
                label="Property Photos"
                type="file"
                accept="image/*"
              />
            </div>

            <hr />

            {/* Address */}
            <div className="space-y-4">
              <CustomFormField name="address" label="Address" />
              <div className="grid grid-cols-3 gap-4">
                <CustomFormField name="city" label="City" />
                <CustomFormField name="state" label="State" />
                <CustomFormField name="postalCode" label="Postal Code" />
              </div>
              <CustomFormField name="country" label="Country" />
            </div>

            <Button type="submit" className="bg-primary-700 text-white w-full">
              Create Property
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewProperty;
