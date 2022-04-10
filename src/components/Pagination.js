export const RenderPaginationActions = ({ currPage = 1, pageAction = () => { } }) => {
    return (<>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center mt-3">
                <li className="page-item">
                    <span className="page-link" onClick={() => pageAction("Previous")}>Previous</span>
                </li>
                <li className="text-white page-item">
                    <span className="page-link">{currPage}</span>
                </li>
                <li className="page-item">
                    <span className="page-link" onClick={() => pageAction("Next")}>Next</span>
                </li>
            </ul>
        </nav>
    </>)
}