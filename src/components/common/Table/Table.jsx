import { useState, useEffect } from 'preact/hooks';
import keys from './keys.json';

const contentful = require('contentful');
const client = contentful.createClient({ ...keys });

const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    client
      .getEntries('training')
      .then((entry) => {
        setData(entry.items.map(({ fields }) => fields));
      })
      .catch((err) => console.error(err));
  }, []);


  const rows = data.map((row) => <tr>
    <td>{row.dayOfWeek}</td>
    <td>{row.time}</td>
    <td>{row.typeOfTraining}</td>
    <td>{row.placeForTraining}</td>
  </tr>
  );

  const columns = [
    {
      name: 'dayOfWeek',
      displayName: 'День недели',
    },
    {
      name: 'time',
      displayName: 'Время',
    },
    {
      name: 'typeOfTraining',
      displayName: 'Тип тренировки',
    },
    {
      name: 'placeForTraining',
      displayName: 'Место проведения',
    }
  ];

  return (
    <table className='table'>
      <thead>
        <tr>
          {columns.map((column) => <td>{column.displayName}</td>)}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => row)}
      </tbody>
    </table>
  );
}


export default TableComponent;
