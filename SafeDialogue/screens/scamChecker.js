import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
const dynamicPadding = width * 0.05; // 5% of screen width
export default ScamCheckScreen = () => {
  const [text, setText] = useState("");

  const handleCheckScam = () => {
    // Implement your scam checking logic here
    // You can access the entered text using the 'text' state variable
    // Example: Check if 'text' contains any known scam phrases or patterns
    // If it's a scam, show an alert or take appropriate action
    // Otherwise, proceed with your application logic
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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
