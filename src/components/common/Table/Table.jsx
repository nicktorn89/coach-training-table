import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TableComponent = ({ data }) => (
  <Paper>
    <Table aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell align='center'>День недели</TableCell>
          <TableCell align='center'>Время</TableCell>
          <TableCell align='center'>Тип тренировки</TableCell>
          <TableCell align='center'>Место проведения</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map && data.map((row) => (
          <TableRow key={row.id}>
            <TableCell align='center'>
              {row.dayOfWeek}
            </TableCell>
            <TableCell align='center'>{row.time}</TableCell>
            <TableCell align='center'>{row.typeOfTraining}</TableCell>
            <TableCell align='center'>{row.placeForTraining}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default TableComponent;
