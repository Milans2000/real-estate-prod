"use client";

import {
  Authenticator,
  Heading,
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
          <span className="font-bold">Welcome!</span> Please sign in to continue
        </p>
      </View>
    );
  },
};

export default function SignInPage() {
  return (
    <Authenticator
      initialState="signIn"
      components={components}
    />
  );
}
