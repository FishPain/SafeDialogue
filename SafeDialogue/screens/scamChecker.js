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
} from "react-native";

const { width } = Dimensions.get("window");
const dynamicPadding = width * 0.05; // 5% of screen width

export default ScamCheckScreen = () => {
  const [text, setText] = useState("");
  const [smsContent, setSmsContent] = useState("");

  useEffect(() => {
    if (Platform.OS === "android") {
      requestSMSPermission();
    }
  }, []);

  const requestSMSPermission = async () => {
    const Permissions = require("react-native-permissions");
    try {
      const granted = await Permissions.request(
        Permissions.ANDROID.PERMISSIONS.READ_SMS
      );

      if (granted === "authorized") {
        // SMS permission granted, start SMS retrieval
        startSMSRetrieval();
      } else {
        // SMS permission denied, handle accordingly
        console.warn("SMS permission denied");
      }
    } catch (error) {
      console.error("Error requesting SMS permission:", error);
    }
  };

  const startSMSRetrieval = () => {
    const SmsRetriever = require("react-native-sms-retriever");
    SmsRetriever.startSmsRetriever()
      .then((result) => {
        if (result) {
          console.log("SMS Retriever started successfully");
          console.log("SMS Message:", result.message);
          setSmsContent(result.message);
          // Process the SMS message as needed (e.g., extract OTP)
        } else {
          console.log("SMS Retriever failed to start");
        }
      })
      .catch((error) => {
        console.error("Error starting SMS Retriever:", error);
      });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleCheckScam = () => {};

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter up to 500 characters"
          multiline
          maxLength={500}
          onChangeText={(value) => setText(value)}
          value={text}
        />
        <Button title="Check Scam" onPress={handleCheckScam} />
        {Platform.OS === "android" && (
          <TextInput
            style={styles.input}
            placeholder="SMS Content"
            multiline
            onChangeText={(value) => {requestSMSPermission}}
            value={smsContent}
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
