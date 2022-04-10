import { useState } from "react";

const renderOptions = (years) => {

    let list = years.map((year, index) => {
        return <option key={year}>{year}</option>
    });

    list.push(<option key={"All"}>All</option>);
    list.reverse();

    return list;
}

export const RenderFilters = ({ years = [], setYear = () => { }, setSearchText = () => { }, fetchRating = () => { }, year = "All" }) => {

    const filterByYear = (e) => {
        setYear(e.target.value.toString());
    }

    let [searchText, setSearch] = useState("");
    let [rating, setRating] = useState(0);

    const ClearRating = () => {
        setRating(0);
        fetchRating(0);
    }
    return (<div className="row mx-2 mb-2">
        <div className="col-md-4 col-xl-4 col-sm-6 col-xs-12 my-auto mb-2">
            <div className="input-group">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Filter By Year</label>
                <select className="form-select" id="inputGroupSelect01" onChange={filterByYear} value={year || "All"}>
                    {renderOptions(years)}
                </select>
            </div>

        </div>
        <div className="col-md-4 col-xl-4 col-sm-6 col-xs-12 my-auto mb-2">
            <div className="input-group">
                <input type="text" className="form-control" placeholder='Enter movie name to search' value={searchText} onChange={(e) => setSearch(e.target.value)}></input>
                <button className='btn btn-primary' onClick={() => setSearchText(searchText)}>Search</button>
            </div>

        </div>
        <div className="col-md-4 col-xl-4 col-sm-6 col-xs-12 text-center">
            <label htmlFor="customRange1" className="form-label text-white me-2"><b>Rating range (1-10) step (0.1)</b></label>
            <label className='text-white'><b>Value:</b> {rating}</label>

            <input type="range" className="form-range" id="customRange1" min="1" max="10" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} />
            <div className="text-center">
                <button className='btn btn-primary' onClick={() => fetchRating(rating)}>Filter</button> &nbsp;
                <button className='btn btn-primary' onClick={ClearRating}>Clear Rating Filter</button>
            </div>
        </div>
    </div>)
}