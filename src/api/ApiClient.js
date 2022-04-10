const FetchData = async (url = "") => {
    try {
        if (url) {
            let response = await fetch(url);
            let details = await response.json();

            if (details.error) {
                throw Error(details.error.message)
            }

            return { error: "", details };
        }
        throw Error({ message: "No Url Found" });

    } catch (error) {
        console.log({ error });
        return { error: error.message.toString() }
    }

}

export const FetchMovies = async (currPage = 1, searchText = "") => {
    let url = "https://movie-task.vercel.app/api/popular?page=" + currPage;

    if (searchText) {
        url = 'https://movie-task.vercel.app/api/search?page=' + currPage + '&query=' + searchText;
    }

    let response = await FetchData(url);

    if (response.error) {
        return response;
    }

    let years = {};
    response.details.data.results.forEach((movie) => {
        if (movie.release_date && movie.release_date.split("-")[0])
            years[movie.release_date.split("-")[0]] = "";
    });

    return { error: "", movies: response.details.data.results, pageLimit: response.details.data.total_pages, years: Object.keys(years) };
}

export const FetchMovieDetails = async (movieId = 0) => {
    let url = "https://movie-task.vercel.app/api/movie?movieId=" + movieId;
    let response = await FetchData(url);
    if (response.error) {
        return response;
    }
    return { error: "", movieDetails: response.details.data };
}