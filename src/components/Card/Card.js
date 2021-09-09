import React from 'react'
import ContentLoader from "react-content-loader"
import {AppContext} from '../../App'


function Card({img, rate, date, title, isLoading, id: uniqueID, first_air_date, original_name}) {
    // const [isAdded, setIsAdded] = React.useState(false)
    const {addBookmark, bookmarks, openMoviePage} = React.useContext(AppContext)



    const handleCardClick = (e) => {
        if (e.target.classList.contains('bi')) return;
        openMoviePage(title, original_name)

    }

    const handleBookmark = () => {
        addBookmark({img, rate, date, title, original_name,  uniqueID, first_air_date})
        // setIsAdded(!isAdded)
    }
    const isAdded = () => {
        
        return bookmarks.some(item => (item.title || item.original_name) === (title || original_name))
    }
    return (
        isLoading ? 
        <ContentLoader className = "contentLoader"
            speed={2}
            width={160}
            height={320}
            viewBox="0 0 160 320"
            backgroundColor="#1e0838"
            foregroundColor="#ecebeb">
            <rect x="0" y="-1" rx="12" ry="12" width="160" height="250" /> 
            <rect x="100" y="61" rx="0" ry="0" width="3" height="8" /> 
            <rect x="0" y="260" rx="12" ry="12" width="160" height="30" />
        </ContentLoader>   

        : <div onClick = {handleCardClick} className = "card">
            <img width = {160} height = {250} src = {`https://image.tmdb.org/t/p/original/${img}`} alt = "" />
            <div className = "imageHover">
                <div className = "favorites">
                  <i onClick = {handleBookmark} className = {`${!isAdded() ? "bi bi-bookmark" : "bi bi-bookmark-fill"}`}></i>
                </div>
                <div className = "movieInfo">
                  <b className = {`movieInfoSpan ${rate >= 8 ? "green" : rate >= 6 ? "orange" : "red"}`}>{rate}</b>
                  <p>{(date || (first_air_date || '')).split('-')[0]}, USA,<br/> Action</p>
                  <p className = "duration">107 minutes</p>
                </div>
            </div>
            <h5>{title || original_name}</h5>
        </div>
        
    )
}

export default Card

