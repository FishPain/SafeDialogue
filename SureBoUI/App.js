import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./screens/settings.js";
import { AppProvider } from "./utils/AppContext.js";
import { version } from './package.json';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <AppProvider version={version}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Settings">
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Settings" }}
          />
          {/* You can add more screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
