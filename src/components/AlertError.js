import "../css/AlertError.css";

export const AlertError = ({ error = "", setError = () => { } }) => {
    return (<>
        {error ? <div className="alert alert-warning alert-dismissible fade show w-50 position-absolute text-center mx-auto alert-container" role="alert" >
            <strong>Error:</strong>&nbsp; Some Error Occurred while fetching Details. Please try reloading.
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setError(false)}></button>
        </div> : null}
    </>)
}