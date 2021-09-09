

export function MoviePage({setMoviePageIsOpen, movie}) {
    
    return (
        <div className = "overlay">
            <div className = "moviePage" style = {{background: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path}) no-repeat center /cover`}}> 
                <div className = "content d-flex align-center">
                    <i onClick = {() => setMoviePageIsOpen(false)} className = "bi bi-x-circle-fill"></i>
                    <div className = "d-flex ml-30 mr-30 mt-30">
                        <img className = "mr-30" width = {405} height = {620} src = {`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt = ""/>
                        <div className = "moviePageInfo">
                            <h4 className = "mb-20">{movie?.title || movie.original_name}</h4>
                            <span className = {movie.vote_average >= 8 ? "green" : movie.vote_average >= 7 ? "orange" : "red"}>{movie.vote_average}</span>
                            <p className = "mb-20">Release Date: <b>{movie.release_date}</b></p>
                            <p className = "overview mb-15">{movie.overview}</p>
                            <b className = "cu-p" onClick = {() => alert("Лень было добать ссылку на йт")}>Play Trailer</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}