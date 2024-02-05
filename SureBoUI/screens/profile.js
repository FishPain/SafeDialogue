import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default ProfileScreen = () => {
  const navigation = useNavigation();

  const logout = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/default_profile_icon.webp")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Tony Yu</Text>
        <Text style={styles.email}>example@gmail.com</Text>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Text style={styles.editProfileText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.inviteButton}
          onPress={() => {
            navigation.navigate("ScamCheck");
          }}
        >
          <Text style={styles.inviteText}>Check Scam</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    color: "#aaa",
    fontSize: 16,
  },
  editProfileButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: "#000",
    borderWidth: 1,
  },
  editProfileText: {
    color: "#000",
    fontSize: 16,
  },
  body: {
    width: '100%', 
    paddingBottom: 50, 
    padding: 20, 
  },
  label: {
    color: "#000",
    fontSize: 16,
    marginBottom: 10,
  },
  inviteButton: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  inviteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#1E90FF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
