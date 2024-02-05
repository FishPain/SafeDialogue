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

import SmsListener from "react-native-android-sms-listener";

const { width } = Dimensions.get("window");
const dynamicPadding = width * 0.05; // 5% of screen width

export default ScamCheckScreen = () => {
  const [text, setText] = useState("");
  const [smsContent, setSmsContent] = useState("");

  useEffect(() => {
    requestSMSPermission();
  }, []);

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
            onChangeText={(value) => {
              requestSMSPermission;
            }}
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

const requestSMSPermission = async () => {
  if (Platform.OS === "android") {
    // Dynamically import the 'react-native-permissions' module
    const { check, request, PERMISSIONS, RESULTS } = await import("react-native-permissions");

    // Now, use these imported methods and objects as needed
    const checkResult = await check(PERMISSIONS.ANDROID.READ_SMS);

    if (checkResult === RESULTS.GRANTED) {
      console.log("SMS permission already granted");
      startSMSRetrieval();
    } else {
      console.log("Requesting SMS permission");
      const result = await request(PERMISSIONS.ANDROID.READ_SMS);
      if (result === RESULTS.GRANTED) {
        console.log("Permission granted to read SMS");
        startSMSRetrieval(); // Make sure this function is defined elsewhere in your code
      } else {
        console.log("SMS permission denied");
      }
    }
  }
};

const startSMSRetrieval = () => {
  try {
    SmsListener.addListener((message) => {
      /* message = {
          originatingAddress: string,
          body: string,
          timestamp: number
        } */

      console.info(message);

      setSmsContent(message.body);
      startSMSRetrieval.remove();
    });
  } catch (error) {
    console.error("Error starting SMS Retriever:", error);
    console.log(JSON.stringify(error));
  }
};
