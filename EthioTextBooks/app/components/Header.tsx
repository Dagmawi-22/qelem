import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";


const IrregularHeader = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.background}>
        <View style={styles.curve} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Awesome Header</Text>
        <Text style={styles.description}>
          This is a stylish and irregularly shaped header component that starts
          from the status bar.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 200,
    width: "100%",
    overflow: "hidden",
    borderBottomEndRadius: 50
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
    top: (StatusBar as any)?.currentHeight + 40,
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
