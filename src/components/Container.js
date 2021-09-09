import Card from './Card/Card'
import React from 'react'
// import ContentLoader from "react-content-loader"
import {Link} from 'react-router-dom'
// import {AppContext} from '../App'


export function Container({setSearchedMovies, heading, movies, isLoading}) {   
    const [translate, setTranslate] = React.useState(0)
    // const {bookmarks} = React.useContext(AppContext)

    
    
   
    const handleTranslate = () => {
        setTranslate(prev => prev === 0 ? prev - 1140 : prev + 1140)
    }



    return (
        <div className = "container">
                {translate !== 0 && <i onClick = {handleTranslate} className="bi bi-chevron-compact-left"></i>}
                {translate === 0 && <i onClick = {handleTranslate} className="bi bi-chevron-compact-right"></i>}
                
           <div className = "movies">
                <h3>
                    {heading}
                </h3>
                <div className = "moviesBlock" style = {{transform: `translateX(${translate}px)`}}>
                {(isLoading ? [...Array(6)] : movies).map((card, index) => index < 11 ? <Card key = {index} 
                                                    img = {card?.poster_path}
                                                    title = {card?.title}
                                                    rate = {card?.vote_average}
                                                    date = {card?.release_date}
                                                    isLoading = {isLoading}
                                                    {...card}
                                                /> :  index < 12 ? <Link to = {`/react-ivi/${heading[0].toLowerCase() + heading.slice(1).split(' ').join('')}`}>
                                                                        <div key = {index} className = "emptyCard">
                                                                            <p>Watch All</p>
                                                                        </div>
                                                                    </Link> : '') }
                </div>
           </div>
        </div>

    )
}