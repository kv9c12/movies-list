import React from 'react'
import { useEffect, useState } from "react";

import RenderModal from './Modal';
import { FetchMovies, FetchMovieDetails } from "../api/ApiClient";
import { RenderMovies } from "./Movies";
import { RenderFilters } from './Filters';
import { RenderPaginationActions } from './Pagination';
import { AlertError } from './AlertError';
import { Loader } from './Loading';

import "../css/moviesList.css"

const MoviesContainer = () => {

    let [movies, setMovies] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [movieId, setMovieId] = useState(0);
    let [movieDetails, setMovieDetails] = useState({});
    let [year, setYear] = useState("All");
    let [years, setYears] = useState([]);
    let [showSpinner, setSpinner] = useState(true);
    let [error, setError] = useState(false);
    let [searchText, setSearchText] = useState("");
    let [rating, setRating] = useState(0);
    let [currPage, setPage] = useState(1);
    let [pageLimit, setPageLimit] = useState(0);

    const GetMovies = async () => {
        let res = await FetchMovies(currPage, searchText);

        if (res.error) {
            setError(res.error);
        }
        else {
            setMovies(res.movies);
            setPageLimit(res.pageLimit);
            setYears(res.years);
        }
    }

    useEffect(() => {
        GetMovies();
    }, []);

    useEffect(() => {

        const GetMovieDetails = async () => {
            let res = await FetchMovieDetails(movieId);
            if (res.error) {
                setError(res.error);
            }
            else {
                setMovieDetails(res.movieDetails);
            }
        }

        movieId && GetMovieDetails(movieId);
    }, [movieId])

    useEffect(() => {
        setSpinner(false);
    }, [movies, error, movieDetails]);

    useEffect(() => {
        GetMovies();
        setPage(1);
        setYear("All");
        setSpinner(true);
    }, [searchText])

    useEffect(() => {
        setSpinner(true);
        GetMovies();
    }, [currPage]);

    const toggleModal = (id = 0) => {
        setSpinner(true);
        setShowModal(true);
        id && setMovieId(id);
    }

    const pageAction = (action) => {
        if (action === "Previous") {
            setPage(currPage - 1 < 1 ? 1 : currPage - 1);
        }
        else if (action === "Next") {
            setPage(currPage + 1 <= pageLimit ? currPage + 1 : pageLimit);
        }
    }

    return (
        <div>
            <AlertError
                error={error}
                setError={setError}
            />
            {showSpinner ? <Loader /> : null}
            <div className={'container min-width-fit-content ' + (showSpinner || error ? 'opacity-25 pe-none' : "")}>
                <div className="h1 text-center text-white">Movies List</div>
                <RenderFilters
                    setYear={setYear}
                    years={years}
                    setSearchText={setSearchText}
                    fetchRating={setRating}
                    year={year}
                />
                <div className={'row mx-2'}>
                    <RenderMovies
                        movies={movies}
                        year={year}
                        rating={rating}
                        toggleModal={toggleModal}
                    />
                    {year === "All" && !rating && movies.length ? <RenderPaginationActions
                        currPage={currPage}
                        pageAction={pageAction}
                    /> : null}
                </div>

            </div>

            {!showSpinner && movieDetails && Object.keys(movieDetails).length && <RenderModal
                showModal={showModal}
                title={movieDetails.title}
                overview={movieDetails.overview}
                hideModal={() => {
                    console.log("Close modal")
                    setShowModal(false)
                }}
            />}

        </div>

    )
}

export default MoviesContainer