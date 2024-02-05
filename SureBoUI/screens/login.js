import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.replace("Profile");
        }}
      >
        <Text style={styles.buttonText}>Sign in with Email</Text>
      </TouchableOpacity>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="logo-google" size={20} color="white" />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="logo-apple" size={20} color="white" />
        <Text style={styles.buttonText}>Sign in with Apple ID</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By Continuing you agree to the Terms and Conditions
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#000",
    fontSize: 18,
    marginBottom: 50,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#1E90FF",
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
  },
  termsText: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 30,
    textAlign: "center",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  lineText: {
    width: 50,
    textAlign: "center",
    color: "gray",
  },
});
