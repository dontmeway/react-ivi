import React from 'react';
import axios from "axios";
import Header from './components/Header/index'
import {Container} from './components/Container'
import {Route, } from 'react-router-dom'
import {Page} from './components/Page'
import { MoviePage } from './components/MoviePage';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';





export const AppContext = React.createContext({})

function App() {
  const [topRated, setTopRated] = React.useState([]);
  const [upComing, setUpComing] = React.useState([]);
  const [topRatedShows, setTopRatedShows] = React.useState([]);
  const [popularShows, setPopularShows] = React.useState([]);
  const [latest, setLatest] = React.useState([]);
  const [bookmarks, setBookmarks] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchedMovies, setSearchedMovies] = React.useState([])
  const [moviePage, setMoviePage] = React.useState([])
  const [moviePageIsOpen, setMoviePageIsOpen] = React.useState(false)
  const [isReady, setIsReady] = React.useState(false)






  React.useEffect(() => {
    setTimeout(() => setIsReady(true), 7000)
  }, [])



  React.useEffect(() => {
    alert('Пожалуйста, не спешите с действиями, так как сайт может работать медленно из-за клиентского API')
  }, [])

  const searchMovie = async (value) => {
    const resp = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&query=${value}&page=1&include_adult=false`)
    const result = resp.data
    setSearchedMovies(result.results);
  }


  const openMoviePage = async (title, original_name) => {
    title = title || original_name;
    try {
      const movie = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&query=${title}&page=1&include_adult=false`);
      const result = await movie.data;
      if (result.results[0] === undefined) {
        return
      } else {
        setMoviePage([result.results[0]])
        setMoviePageIsOpen(true)
      }
    } catch(err) {
      console.error(err);
    }
  }

  const addBookmark = async (obj) => {
    if (bookmarks.find(item => (item.title || item.original_name) === (obj.title || obj.original_name))) {
      setBookmarks(prev => prev.filter(item => {
        if ((item.title || item.original_name) === (obj.title || obj.original_name)) {
          axios.delete("https://61381174eac1410017c1851f.mockapi.io/favorites/" + item.id)
          return false
        } else return true
        }))
    } else {
      const resp = await axios.post("https://61381174eac1410017c1851f.mockapi.io/favorites", obj)
      setBookmarks(prev => [...prev, resp.data])
      
    }
  }
  console.log(moviePage);
  React.useState(() => {
    (async () => {
      try {
        const [upcoming, toprated, latest, bookmarks, topRatedShows, popularShows] = await Promise.all([axios("https://api.themoviedb.org/3/movie/upcoming?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&page=1"), axios("https://api.themoviedb.org/3/movie/top_rated?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&page=1"), axios("https://api.themoviedb.org/3/movie/now_playing?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&page=1"), axios.get("https://61381174eac1410017c1851f.mockapi.io/favorites"), axios("https://api.themoviedb.org/3/tv/top_rated?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&page=1"), axios("https://api.themoviedb.org/3/tv/popular?api_key=1eb0a1c18307918499a667fef3653e0e&language=en-US&page=1")]) 

        setUpComing(upcoming.data.results)
        setTopRated(toprated.data.results)
        setBookmarks(bookmarks.data)
        setTopRatedShows(topRatedShows.data.results)
        setPopularShows(popularShows.data.results)
        setLatest(latest.data.results)

        setIsLoading(false)
      } catch(err) {
          alert("Error, please check console")
          console.error(err);
      }
    })()
  }, [])


  return (
    <AppContext.Provider value = {{addBookmark, bookmarks, searchMovie, openMoviePage}}>
      {!isReady && <Logo />}
      {<><div className = {isReady ? `wrapper mb-30` : `wrapper mb-30 o-hidden`}>
        <Header />
        {moviePageIsOpen && <MoviePage movie = {moviePage[0]} setMoviePageIsOpen = {setMoviePageIsOpen} />}
        <Route path = "/react-ivi" exact>
          <h1>Movies</h1>
          <Container heading={"Latest Releases"} movies={latest} isLoading={isLoading} />
          <Container heading={"Top Rated"} movies={topRated} isLoading={isLoading} />
          <Container heading={"Upcoming Releases"} movies={upComing} isLoading={isLoading} />
          <h1>Shows</h1>
          <Container heading={"Top Rated Shows"} movies={topRatedShows} isLoading={isLoading} />
          <Container heading={"Popular"} movies={popularShows} isLoading={isLoading} />       
        </Route>
        <Route path = "/react-ivi/latestReleases" exact>
          <Page movies = {latest} heading = "Latest Releases" isLoading = {isLoading}/>
        </Route>
        <Route path = "/react-ivi/topRated" exact>
          <Page movies = {topRated} heading = "Top Rated" isLoading = {isLoading}/>
        </Route>
        <Route path = "/react-ivi/upcomingReleases" exact>
          <Page movies = {upComing} heading = "Upcoming Releases" isLoading = {isLoading}/>
        </Route>
        <Route path = "/react-ivi/topRatedShows" exact>
          <Page movies = {topRatedShows} heading = "Top Rated Shows" isLoading = {isLoading}/>
        </Route>
        <Route path = "/react-ivi/popular" exact>
          <Page movies = {popularShows} heading = "Popular Shows" isLoading = {isLoading}/>
        </Route>
        <Route path = "/react-ivi/myIvi" exact>
          <Page movies = {bookmarks} heading = "My IVI" isLoading = {isLoading} added/>
        </Route>
        <Route path = "/react-ivi/searchByRequest" exact>
          <Page movies = {searchedMovies} heading = {`Search by request`} isLoading = {isLoading} isSearch added/>
        </Route>
      </div>
      <Route path = "/react-ivi/" exact>
        <Footer />
      </Route></>}
    </AppContext.Provider>
  );
}

export default App;




