import { useNavigation } from "@react-navigation/native"
import React from "react"
import { ImageBackground, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useState } from "react/cjs/react.development"
import { MAX_HEIGHT, MAX_WIDTH } from "./constants"
import Spinner from "./Spinner"
export const MovieCard = ({ id, title, release_date, overview, imgUrl }) => {
  const [loaded, setLoaded] = useState(false)
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate("MovieInfo", {
        id,
        title,
        release_date,
        overview,
        imgUrl,
      })
    }}
    style={{
      justifyContent: "center",
    alignItems: "center",
    }}
    activeOpacity={0.85} >
      <ImageBackground source={ imgUrl? {
          uri:
          `https://image.tmdb.org/t/p/original/${imgUrl}`,
        } : require("./assets/image-placeholder.jpg")} 
        style={styles.container}
        onLoad={() => setLoaded(true)}
        >
          {
            !loaded && <Spinner/>
          }
        </ImageBackground>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    minWidth: MAX_WIDTH,
    height: MAX_HEIGHT * 0.7,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
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