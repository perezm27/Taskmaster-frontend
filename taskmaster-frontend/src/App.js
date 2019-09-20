import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

import './app.scss';

const API = 'https://pm5plikooh.execute-api.us-west-2.amazonaws.com/Dev/tasks';

let form = new FormData();

function App() {

  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API)
      .then( data => data.json() )
      .then( fetchedTasks => setTasks(fetchedTasks.Items) );
  }

  function _handleChange(event) {
    let value = event.target.files ? event.target.files[0] : event.target.value;
    form.set(event.target.name, value);
  }

  function _upload(event, taskId) {
    event.preventDefault();
    fetch(`http://taskmaster-env.3te35qtepv.us-west-2.elasticbeanstalk.com/api/v1/tasks/${taskId}/images`, {
      method: "POST",
      mode: 'cors',
      body: form,
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
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
                  <span>{task.title}</span>

                  <form onSubmit={(e) => _upload(e, task.id)} action={API} method="post" encType="multipart/form-data">
                  <p>Please Upload an image</p>
                    <input onChange={_handleChange} name="file" type="file" />
                    <button type="submit">Save</button>
                  </form>

                </summary>
                <History history={task.userHistory ? task.userHistory : []} image={task.iMG} />
              </details>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

function History(props) {
  console.log("props IMG: " + props.image)
  return (
    <div>
    <img id="original" src={props.image} alt=''/>
    <img src ={props.image ? [props.image.slice(0, 31), '-resized', props.image.slice(31)].join('') : ''} alt=''/>
  
    <ol>
      {props.history.map( (record,idx) => {

const data = [{ id: 1, title: record.date, summary: record.action, image: props.image}];
const columns = [ 
  {
    name: 'Status Change',
    sortable: false,
    cell: row => <div><div style={{ fontWeight: 700 }}>{row.title}</div>{row.summary}</div>,
  }
];

const ExpanableComponent = ({ data }) => <img src={data.image} alt='task img'/>;

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
    </div>
  )
}
export default App;
