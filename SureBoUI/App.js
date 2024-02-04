import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./screens/settings.js";
import RiskProfileScreen from "./screens/riskProfile.js";
import { AppProvider } from "./utils/AppContext.js";
import { version } from "./package.json";

const Stack = createNativeStackNavigator();

function App() {
  const questions = require('./assets/risk_profile_qns.json');

  return (
    <AppProvider version={version}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Settings">
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Settings" }}
          />
          <Stack.Screen name="RiskProfile" options={{ title: "Risk Profile" }}>
            {(props) => <RiskProfileScreen {...props} questions={questions} />}
          </Stack.Screen>
          {/* You can add more screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
