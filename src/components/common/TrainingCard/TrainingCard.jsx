import { memo } from 'preact/compat';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const TrainingCard = ({ data, onOpenTraining }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom style={{ textAlign: 'center' }}>
        Тренировка {data.typeOfTraining}
      </Typography>

      <Typography gutterBottom style={{ textAlign: 'center' }}>
        {data.dayOfWeek}. Начало в {data.time}
      </Typography>

      <Typography gutterBottom style={{ textAlign: 'center' }}>
        {data.placeForTraining}
      </Typography>
    </CardContent>

    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button size='small' onClick={onOpenTraining}><span data-training-id={data.id}>Узнать больше</span></Button>
    </CardActions>
  </Card>
);

export default memo(TrainingCard);
