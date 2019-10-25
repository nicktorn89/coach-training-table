import Typography from '@material-ui/core/Typography';

const Heading = ({ text }) => (
  <Typography className='heading' component='h2' variant='h2'>
    {text}
  </Typography>
);

export default Heading;
