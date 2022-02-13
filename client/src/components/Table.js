import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export const Table = ({data}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredData, setFilteredData] = useState(data)
    const [searchedEmail, setSearchedEmail] = useState('')
    const rowsPerPage = 5
    const navigate = useNavigate()
    const maxPages = data.length / 5

    React.useEffect(() => {
        if(data.length !== 0 && searchedEmail !== '') {
            const results = data.filter(elem =>
                elem._source.email?.toLocaleLowerCase().includes(searchedEmail)
            );
            if(results) {
                // @ts-ignore
                setFilteredData(results);
            }
        }
    }, [data, searchedEmail]);

    const handleChange = event => setSearchedEmail(event.target.value)

    const resetSearch = () => {
        setFilteredData(data)
        setSearchedEmail('')
    }

    const paginate = (array, page_size, page_number) => {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    const goToPreviousPage = () => {
        if(currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    const goToNextPage = () => {
        if(currentPage <= maxPages-1)
            setCurrentPage(currentPage + 1)
    }

    const goToColumnPage = (id) => () => navigate(`/${id}`)

    return(
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Search by email"
                            onChange={handleChange}
                            value={searchedEmail}
                        />
                        <button type="button" className={"btn btn-primary"} onClick={resetSearch}>Reset search</button>
                    </div>
                </tr>
                <tr>
                    <td>id</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Body</td>
                </tr>
            </thead>
            <tbody>
            {paginate(filteredData, rowsPerPage, currentPage).map(elem => (
                <tr key={elem._id} style={{cursor: 'pointer'}} onClick={goToColumnPage(elem._id)}>
                    <td>{elem._id}</td>
                    <td>{elem._source.name}</td>
                    <td>{elem._source.email}</td>
                    <td>{elem._source.body} </td>
                </tr>
            ))}
            </tbody>
            <tfoot>
                <tr className={'row'}>
                    <p className="col-5">
                        Showing {currentPage} to {maxPages} of {maxPages} pages
                    </p>
                    <ul className="col-7 pagination">
                        <li
                            onClick={goToPreviousPage}
                            className={currentPage === 1 ? "page-item disabled" : "page-item"}
                            style={{cursor: 'pointer'}}
                        >
                            <a className="page-link">
                                Previous
                            </a>
                        </li>
                        <li
                            onClick={goToNextPage}
                            className={currentPage <= maxPages-1 ? "page-item" : "page-item disabled"}
                            style={{cursor: 'pointer'}}
                        >
                            <a className="page-link">
                                Next
                            </a>
                        </li>
                    </ul>
                </tr>
            </tfoot>
        </table>
    )
}
