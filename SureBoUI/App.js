import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "./screens/settings.js";
import RiskProfileScreen from "./screens/riskProfile.js";
import LoginScreen from "./screens/login.js";
import ProfileScreen from "./screens/profile.js";
import ScamCheckScreen from "./screens/scamChecker.js";

import { AppProvider } from "./utils/AppContext.js";
import { version } from "./package.json";

const Stack = createNativeStackNavigator();

export default function App() {
  const questions = require("./assets/risk_profile_qns.json");

  return (
    <AppProvider version={version}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "SafeDialogue",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: "Profile",
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Settings" }}
          />
          <Stack.Screen
            name="ScamCheck"
            component={ScamCheckScreen}
            options={{ title: "Check Scam" }}
          />
          <Stack.Screen name="RiskProfile" options={{ title: "Risk Profile" }}>
            {(props) => <RiskProfileScreen {...props} questions={questions} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
