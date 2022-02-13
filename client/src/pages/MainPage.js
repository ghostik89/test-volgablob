import React, {useEffect, useState} from "react";
import JSONPretty from 'react-json-pretty';
import {Table} from "../components/Table";


export const MainPage = () => {
    const [view, setView] = useState('JSON')
    const [data, setData] = useState([])
    const setJSONView = () => setView('JSON')
    const setTableView = () => setView('table')

    useEffect(() => {

        fetch('api/v1/comments/all')
            .then(req => req.json())
            .then(res => setData(res))
            .catch(() => setData([]))
        return () => setData([])
    },[])


    return (
        <div className={'container'}>
            <h1>Test app</h1>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button
                    type="button"
                    className={view === 'JSON' ? "btn btn-primary active" : "btn btn-primary"}
                    onClick={setJSONView}
                >
                    Show JSON
                </button>
                <button
                    type="button"
                    className={view === 'table' ? "btn btn-primary active" : "btn btn-primary"}
                    onClick={setTableView}
                >
                    Show table</button>
            </div>
            {view === 'JSON' ?
                <JSONPretty id="json-pretty" data={data} onJSONPrettyError={e => console.error(e)}/> :
                <Table data={data}/>}

        </div>
    )
}