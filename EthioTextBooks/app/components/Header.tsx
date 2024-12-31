import React from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";

const IrregularHeader = () => {
    const logo = require("../../assets/images/icon.png");
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.background}>
        <View style={styles.curve} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Your Learning, Made Simple</Text>
        <Text style={styles.description}>
          All your textbooks in one place. Study at your pace, your own way.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 250, 
    width: "100%",
    overflow: "hidden",
    borderBottomEndRadius: 50,
  },
  logo: {
    position: "absolute",
    top: 40,
    right: 20, 
    width: 50,
    height: 50, 
    zIndex: 1, 
    borderRadius: 25
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "#00B4DB",
  },
  curve: {
    position: "absolute",
    bottom: -50,
    left: -50,
    right: -50,
    height: 150,
    backgroundColor: "#0083B0",
    borderRadius: 100,
    transform: [{ rotate: "-10deg" }],
  },
  textContainer: {
    position: "absolute",
    top: (StatusBar as any)?.currentHeight + 80, 
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
    marginTop: 8,
    lineHeight: 20,
  },
});

export default IrregularHeader;
