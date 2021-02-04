import { useNavigation, useRoute } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect } from "react"
import { Image, Linking, StyleSheet, Text, View } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useState } from "react/cjs/react.development"
import { AdMobComponent } from "./classAdMobComponent"
import { CompanyItem } from "./CompanyItem"
import { API_KEY, MAX_HEIGHT, MAX_WIDTH } from "./constants"
import { SimilarItem } from "./SimilarItem"

export const MovieInfo = ({ route, navigationRef }) => {
  const getData = async() => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
  }

  const [companies, setCompanies] = useState([])
  const [genres, setGenres] = useState([])
  const [countries, setCountries] = useState([])
  const [similar, setSimilar] = useState([])
  const [budget, setBudget] = useState("")
  const [img, setImg] = useState("")
  const [homepage, setHomepage] = useState("")
  const id = route.params.id
  const title = route.params.title
  const release_date = route.params.release_date
  const overview = route.params.overview
  const imgUrl = route.params.imgUrl

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerBackground: () => (
        <Image 
        source={{uri: `https://image.tmdb.org/t/p/w500/${imgUrl}`}} 
        style={{width: MAX_WIDTH, height: MAX_HEIGHT * 0.1, }} resizeMode="cover" />
      )
    })
    getBudget()
    getData()
    getCountries()
    getSimilar()
    getHomepage()
    getGenres()
    getCompanies()
  }, [])

  const getBudget = async() => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
    setBudget(data.data.budget)
  }
  const getHomepage = async() => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
    setHomepage(data.data.homepage)
  }

  const getCountries = async() => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
    setCountries(data.data.production_countries.map(
      c => <Text key={c.name} style={styles.countries} >&bull; {c.name} </Text>
    ))
  }
  const getGenres = async() => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
    setGenres(data.data.genres.map(
      c => <Text key={c.name} style={styles.countries} >&bull; {c.name} </Text>
    ))
  }
  
  const getCompanies = async() => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
    setCompanies(data.data.production_companies.map(
      c => <CompanyItem key={c.name} id={c.id} name={c.name} logo={c.logo_path} country={c.origin_country}/>
    ))
  }

  const getSimilar = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
      )
      setSimilar(res.data.results.map(
        s=> <SimilarItem
        id={s.id}
        key={Math.random().toString()}
         title={s.title} 
         overview={s.overview} 
         imgUrl={s.poster_path}
         release_date={s.release_date}
         />
      ))
  }

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={ () => navigation.goBack() } source={require("./assets/back.png")} style={styles.settings}>
      <Image source={require("./assets/back.png")} style={styles.settings} />
      </TouchableOpacity>
      <ScrollView>
      <Text style={styles.title} >{title} </Text>
      <Text style={styles.orange} >Release date:
        &nbsp;
      </Text>
      <Text>{release_date}</Text>
      <Text style={styles.overview} >{overview} </Text>
      { countries.length > 0 && <Text style={styles.orange} >Production countries:</Text> }
      {countries}
      <View style={{flexDirection: "row"}}>
      <Text style={{...styles.orange, marginBottom: 20}} >{ budget > 0 ? "Budget:" : ""} &nbsp;</Text>
      <Text>{budget > 0 ? budget : ""} </Text>
      </View>
      { genres.length > 0 && <Text style={{...styles.orange, marginVertical: 20}} >Genres:</Text> }
      {genres}
      <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL(homepage);
            }}>{homepage && "Homepage"} </Text>
          {
            companies.length > 0 && <Text style={styles.orange} >Production companies:</Text>
          }
          <ScrollView>
          {
        companies.length > 0 && companies
      }
          </ScrollView>
      { similar.length > 0 && <Text style={{...styles.orange, marginTop: 40}} >Similar:</Text>}

      {
        similar.length > 0 && similar
      }
      </ScrollView>
      <AdMobComponent/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: MAX_HEIGHT * 0.04,
    paddingHorizontal: 20,
  },
  settings:{
    width:55,
    height: 55,
  },
  title: {
    marginVertical: MAX_HEIGHT * 0.1,
    paddingVertical: 10,
    textAlign: "center",
    borderWidth: 1,
    fontSize: 30,
    fontWeight: "600",
  },
  orange: {
    fontSize: 18,
    color: "orange",
    fontStyle: "italic",
  },
  overview: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  countries: {
    marginBottom: 20,
    fontSize: 15,
    fontStyle: "italic"
  },
  hyperlinkStyle: {
    marginVertical: 20,
    color: 'blue',
    fontSize: 20
  },
  titleStyle: {
    fontSize: 20,
    margin: 10,
  },
})