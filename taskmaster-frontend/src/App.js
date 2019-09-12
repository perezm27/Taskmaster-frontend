import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

import './app.scss';

const API = 'http://taskmaster-env.3te35qtepv.us-west-2.elasticbeanstalk.com/api/v1/tasks';

function App() {

  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API)
      .then( data => data.json() )
      .then( fetchedTasks => setTasks(fetchedTasks) );
  }

  function _deleteTask(id) {
    fetch()
     .method()
     .then()
  }

  useEffect( _getTasks, [] );

  return (
    <div className="app">
      <ul>
        {tasks.map( (task,idx) => {
          return (
            <li key={task.id}>
              <details>
                <summary>
                  <span onClick={_deleteTask}>{task.title}</span>
                </summary>
                <History history={task.userHistory ? task.userHistory : []} />
              </details>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

function History(props) {
  return (
    <ol>
      {props.history.map( (record,idx) => {

const data = [{ id: 1, title: record.date, summary: record.action}];
const columns = [ 
  {
    name: 'Status Change',
    sortable: true,
    cell: row => <div><div style={{ fontWeight: 700 }}>{row.title}</div>{row.summary}</div>,
  }
];
 
const ExpanableComponent = ({ data });


        return (
          <DataTable
    title="User History"
    columns={columns}
    data={data}
    selectableRowsComponentProps={{ inkDisabled: true }}
    expandableRowsComponent={<ExpanableComponent />}
  />
        )
      })}
    </ol>
  )
}
export default App;
