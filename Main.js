import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_KEY, MAX_HEIGHT, MAX_WIDTH } from './constants';
import { MovieCard } from './MovieCard';
import Spinner from './Spinner';
export function Main() {
  useEffect(() => {
    getData()
  }, [])
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [loaded, setLoaded] = useState(false)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [] = useState(0)
  const [] = useState("")
  const navigation = useNavigation()

  async function getData() {
    try {
    let response = 
    await fetch(
      `https://api.themoviedb.org/3/trending/movies/week?api_key=${API_KEY}&page=${page}&language=ru`);
    let responseJson = await response.json();
    setMovies(responseJson.results)
  } 
  catch (error) {
    console.error(error);
  }
}

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  }
  return (
    <View style={styles.container}>
      <ScrollView 
      bounces={false} 
      style={{ maxWidth: MAX_WIDTH }} 
      scrollEventThrottle={16}
      onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
        getData = async () => {
          const data = await axios.get(
            `https://api.themoviedb.org/3/trending/movies/week?api_key=${API_KEY}&page=${page}&language=ru`
            )
          setMovies([...movies, ...data.data.results])
        }
        setPage(page => page + 1)
        getData()
      }
    }}>
      {
        movies.length ? movies.map(
          m =>  <TouchableOpacity
          key={Math.random().toString()} onPress={() => {
      navigation.navigate("MovieInfo", {
        id: m.id,
        title: m.title,
        release_date: m.release_date,
        overview: m.overview,
        imgUrl: m.poster_path,
      })
    }}
    style={{
      justifyContent: "center",
    alignItems: "center",
    }}
    activeOpacity={0.85} >
      <ImageBackground source={ m.poster_path? {
          uri:
          `https://image.tmdb.org/t/p/original/${m.poster_path}`,
        } : require("./assets/image-placeholder.jpg")} 
        style={styles.cardContainer}
        onLoad={() => setLoaded(true)}
        >
          {
            !loaded && <Spinner/>
          }
        </ImageBackground>
    </TouchableOpacity>
        ) : <Text>No results</Text>
      }
      </ScrollView>
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: MAX_WIDTH,
    height: MAX_HEIGHT,
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: MAX_WIDTH,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    minWidth: MAX_WIDTH * 0.9,
    minHeight: 40,
    marginBottom: 20,
    padding: 15,
    fontSize: 20,
    fontWeight: "500",
    borderColor: 'gray',
    borderWidth: 2
  },
  clear: {
    width: 35,
    height: 35,
    opacity:  0.4,
    position: "absolute",
    top: -4,
    right: "7%"
  },
  settings:{
    width:55,
    height: 55,
  },
  item: {
    padding: 10,
    backgroundColor: "tomato"
  },
  cardContainer: {
    minWidth: MAX_WIDTH,
    height: MAX_HEIGHT * 0.6,
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
});
