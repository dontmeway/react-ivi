import Card from './Card/Card'
import {Link} from 'react-router-dom'



export function Page({heading, movies, isLoading, added, isSearch}) {
    return(
        <div className = "pageParent">
            <h3>{heading}</h3>
            <div className = "page">
                {movies.length === 0 && !isLoading ? <div className = "emptyPage">
                                            <div>
                                                <p>{isSearch ? 'There are no movies that matched your query.' :`You do not have any bookmarks`}</p>
                                                <Link to = "/react-ivi/">
                                                    <button className = "btn">Go to the main page</button>
                                                </Link>                                                
                                            </div>
                
                
                                        </div> : (isLoading ? [...Array(12)] : movies).map((item, index) => <Card key = {index}
                                                   img = {item?.poster_path}
                                                   title = {item?.title}
                                                   rate = {item?.vote_average}
                                                   date = {item?.release_date}
                                                   isLoading = {isLoading}
                                                   added = {added}
                                                   {...item}
                                                />)}
            </div>
        </div>
    )
}
