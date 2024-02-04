import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
} from "react-native";

import { useAppContext } from "../utils/AppContext.js"; // Adjust the path as necessary
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const dynamicPadding = width * 0.05; // 5% of screen width

const SettingsScreen = () => {
  const [responseType, setResponseType] = useState("manual");
  const { appData } = useAppContext();
  const navigation = useNavigation();

  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View
        style={[
          styles.radioButton,
          { borderColor: selected ? "#000" : "#ccc" },
        ]}
      >
        {selected ? <View style={styles.radioButtonSelected} /> : null}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Risk Threshold</Text>
        <TouchableOpacity
          style={styles.setupButton}
          onPress={() => navigation.navigate("RiskProfile")}
        >
          <Text style={styles.setupButtonText}>Set up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Response Type</Text>
        <View style={styles.responseTypeContainer}>
          <RadioButton
            selected={responseType === "auto"}
            onPress={() => setResponseType("auto")}
            label="Auto"
          />
          <RadioButton
            selected={responseType === "manual"}
            onPress={() => setResponseType("manual")}
            label="Manual"
          />
        </View>
      </View>

      <View style={styles.divider} />

      {/* Version and Privacy Policy */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Version:</Text>
        <Text style={styles.versionText}>v{appData.version}</Text>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.link}
        onPress={() => Linking.openURL("http://example.com")}
      >
        <Text style={styles.linkText}>Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: dynamicPadding,
    paddingVertical: dynamicPadding,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 18,
  },

  divider: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1,
  },

  setupButton: {
    backgroundColor: "#E8E8E8",
    padding: 10,
    borderRadius: 5,
  },
  setupButtonText: {
    fontSize: 16,
  },
  versionText: {
    fontSize: 14,
    color: "#666",
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "#0000FF",
    textDecorationLine: "underline",
    textAlign: "right", // Align text to the right
  },
  responseTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  radioLabel: {
    fontSize: 16,
    color: "#000",
  },
});

export default SettingsScreen;
