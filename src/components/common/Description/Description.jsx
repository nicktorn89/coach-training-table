import { memo } from 'preact/compat';
import Typography from '@material-ui/core/Typography';

const Description = ({ text }) => (
  <Typography className='description' component='h5' variant='h5'>
    {text}
  </Typography>
);

export default memo(Description);
