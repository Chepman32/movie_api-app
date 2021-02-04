import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React from "react"
import { useEffect } from "react"
import Dropdown from "./Dropdown"
import { Picker, StyleSheet, Text, View } from "react-native"
import { useState } from "react/cjs/react.development"
import { LANGUAGES_REQUEST, MAX_WIDTH } from "./constants"
import { Languages } from "./Languages"
export const Settings = ({route}) => {
  useEffect(() => {
    getLanguages()
  }, [])
  const [list, setList] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const setLanguage = route.params.setLanguage
  const language = route.params.language
  
  const navigation = useNavigation()

  async function getLanguages() {
    const res = await axios.get(LANGUAGES_REQUEST)
    setList(res.data.map(
      l => l.english_name !== "No Language" && ({english_name: l.english_name, name: l.name, iso_639_1: l.iso_639_1})
    ))
  }
  useEffect(() => {
    selectedLanguage !== language && setLanguage(selectedLanguage) && console.log(selectedLanguage)
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={() => navigation.navigate("Languages", {
        data: list,
        setLanguage,
        language
      })} >Settings</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 60
  }
})