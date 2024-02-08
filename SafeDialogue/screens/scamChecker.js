import React, { useState, useEffect } from "react";

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  Alert,
} from "react-native";

import { requestSMSPermission, readSMS } from "../utils/SMS";

const { width } = Dimensions.get("window");
const dynamicPadding = width * 0.05; // 5% of screen width

const ScamCheckScreen = () => {
  const [text, setText] = useState("");
  const [smsMessageBody, setSmsMessageBody] = useState("");

  useEffect(() => {
    requestSMSPermission().then((res) => {
      if (res) {
        readSMS();
      } else {
        Alert.alert("Permissions not granted", "Please grant permissions");
      }
    });
  }, []);

  const dismissKeyboard = () => Keyboard.dismiss();
  const handleCheckScam = () => {
    // Implement scam checking logic here
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter up to 500 characters"
          multiline
          maxLength={500}
          onChangeText={setText}
          value={text}
        />
        <Button title="Check Scam" onPress={readSMS} />
        {Platform.OS === "android" && (
          <TextInput
            style={styles.input}
            placeholder="SMS Content"
            multiline
            value={smsMessageBody}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: dynamicPadding * 5,
    padding: dynamicPadding,
  },
  input: {
    width: "100%",
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ScamCheckScreen;
