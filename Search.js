import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MAX_HEIGHT, MAX_WIDTH } from './constants';
import { MovieCard } from './MovieCard';
export function Search() {
  useEffect(() => {
    getData()
  }, [])

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [] = useState(0)
  const [query, setQuery] = useState("")
  async function getData() {
    const data = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=70aa31a1529fcca9641d65cbe997a1e2&query=${query}&page=${page}`
      )
    setMovies(data.data.results)
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  }
  useEffect(() => {
    query && getData()
  }, [query])
  return (
    <View style={styles.container}>
      <TextInput
      placeholder="Type the name of movie"
      style={styles.input}
      onChangeText={text => {
        setQuery(text)
        getData()
      }}
      value={query}
    />
      <ScrollView 
      bounces={false} 
      style={{ maxWidth: MAX_WIDTH }} 
      scrollEventThrottle={16}
      onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
        getData = async () => {
          const data = await axios.get(
            !query.length
      ?
      `https://api.themoviedb.org/3/trending/movies/week?api_key=${API_KEY}&page=${page}`
      :
      `https://api.themoviedb.org/3/search/movie?api_key=70aa31a1529fcca9641d65cbe997a1e2&query=${query}&page=${page}`
            )
          setMovies([...movies, ...data.data.results])
        }
        setPage(page => page + 1)
        getData()
      }
    }}>
      {
        movies !== undefined && query && movies.length ? movies.map(
          m => m.id && m.poster_path && <MovieCard
          key={Math.random().toString()}
          title={m.title || m.name}
           overview={m.overview}
            release_date={m.release_date || m.first_air_date}
            imgUrl={m.poster_path}
            id={m.id}
 />
        ) : <Text>No results</Text>
      }
      {
        !query.length && <View/>
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
  }
});
