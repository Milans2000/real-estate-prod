"use client";

import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  View,
} from "@aws-amplify/ui-react";

const components = {
  Header() {
    return (
      <View className="mt-4 mb-7 text-center">
        <Heading level={3} className="!text-2xl !font-bold">
          RENT<span className="text-secondary-500 font-light">IFUL</span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold">Welcome!</span> Please create an account
        </p>
      </View>
    );
  },

  SignUp: {
    FormFields() {
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField legend="Role" name="custom:role" isRequired>
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },
  },
};

export default function SignUpPage() {
  return (
    <Authenticator
      initialState="signUp"
      components={components}
    />
  );
}
