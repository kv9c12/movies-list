export const RenderMovies = ({ movies = [], year = 0, rating = 0, toggleModal = () => { } }) => {
    let newList = movies.filter((movie) => year && year !== "All" && movie.release_date ? movie.release_date.includes(year) : true);
    newList = newList.filter((movie) => rating ? movie.vote_average.toString() === rating : true);

    return Array.isArray(newList) && newList.length ? newList.map((movie, index) => {
        return (
            <div className='col-xd-3 col-md-3 col-sm-6 col-xs-12 d-flex' onClick={() => toggleModal(movie.id)} key={index}>
                <div className='card px-0 my-2 border-0 w-100' key={index}>
                    <img key={index} src={movie.poster_path ? ("https://www.themoviedb.org/t/p/original" + movie.poster_path) : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} alt="img" height="500vh" className="rounded" />
                    <div className='card-body bg-dark text-white'>
                        <div className="card-title text-warning text-center h5">
                            {movie?.title || ""} &nbsp;
                            {movie?.release_date ? `(${movie.release_date.split("-")[0]})` : ""}
                        </div>
                        <div className="card-text">{movie?.overview || ""}</div>
                    </div>
                </div>
            </div>
        )
    }) : [<div className="text-white text-center h5" key={0}>No Results Found</div>]
}