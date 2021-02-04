import React from "react"
import { Image, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { MAX_WIDTH } from "./constants"
export const CompanyItem = ({ id, logo, name, country }) => {
  return (
    <TouchableOpacity style={styles.body}>
      <Image style={styles.logo} resizeMode="contain" source={{uri: `https://image.tmdb.org/t/p/w500/${logo}`}} />
      <Text>{name} </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  body: {
    width: MAX_WIDTH,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    minWidth: 100, height: 40,
    marginRight: 15,
  }
})