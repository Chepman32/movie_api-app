import { useNavigation } from "@react-navigation/native"
import React from "react"
import { ImageBackground, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { MAX_HEIGHT, MAX_WIDTH } from "./constants"
export const SimilarItem = ({ id, title, release_date, overview, imgUrl }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => {
      navigation.push( "MovieInfo", {id, title, release_date, overview, imgUrl,} )
    }}
    activeOpacity={0.85} >
      <ImageBackground source={{
      uri:
      `https://image.tmdb.org/t/p/w500/${imgUrl}`,
    }} 
    style={styles.container}
    
    >

    </ImageBackground>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    minWidth: MAX_WIDTH * 0.2,
    height: MAX_HEIGHT * 0.2,
    margin: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  title: {
    marginVertical: "40%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff"
  },
  img: {
    width: "100%",
    height: "50%"
  },
})