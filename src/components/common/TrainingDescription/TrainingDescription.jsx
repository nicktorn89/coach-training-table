import { memo, useEffect, useState } from 'preact/compat';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Slide from '@material-ui/core/Slide';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { useResize } from '../../hooks';

const TrainingDescription = ({
  isOpen = false, onClose, trainingName = '', trainingDescription = '', images = [], onImageClick,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { screenWidth } = useResize();

  const handleClickOnImage = ({ target }) => {
    onImageClick && onImageClick(target.dataset.imageIndex);
  };

  const Bold = ({ children }) => <Typography component='p' variant='body1' style={{ fontWeight: 'bold' }}>{children}</Typography>;

  const Text = ({ children }) => <Typography component='p' variant='body1'>{children}</Typography>;
  const Heading1 = ({ children }) => <Typography component='h1' variant='h1'>{children}</Typography>;
  const Heading2 = ({ children }) => <Typography component='h2' variant='h2'>{children}</Typography>;
  const Heading3 = ({ children }) => <Typography component='h3' variant='h3'>{children}</Typography>;
  const Heading4 = ({ children }) => <Typography component='h4' variant='h4'>{children}</Typography>;
  const Heading5 = ({ children }) => <Typography component='h5' variant='h5'>{children}</Typography>;
  const Heading6 = ({ children }) => <Typography component='h6' variant='h6'>{children}</Typography>;

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => <Text>{children}</Text>,
      [BLOCKS.HEADING_1]: (_, children) => <Heading1>{children}</Heading1>,
      [BLOCKS.HEADING_2]: (_, children) => <Heading2>{children}</Heading2>,
      [BLOCKS.HEADING_3]: (_, children) => <Heading3>{children}</Heading3>,
      [BLOCKS.HEADING_4]: (_, children) => <Heading4>{children}</Heading4>,
      [BLOCKS.HEADING_5]: (_, children) => <Heading5>{children}</Heading5>,
      [BLOCKS.HEADING_6]: (_, children) => <Heading6>{children}</Heading6>,
    },
    renderText: (text) => text.replace('!', '?'),
  };

  useEffect(() => {
    if (screenWidth <= 750) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  }, [screenWidth]);

  return (
    <Dialog
      aria-labelledby='customized-dialog-title'
      id='dialog'
      open={isOpen}
      fullScreen={isFullScreen}
      onClose={onClose}
      TransitionComponent={Slide}
      transitionDuration={{
        enter: 500,
        exit: 250,
      }}
    >
      <DialogTitle id='customized-dialog-title' onClose={onClose}>
        Описание тренировки {trainingName}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12} className='text-content' style={{ display: 'flex', flexDirection: 'column' }}>
            {typeof trainingDescription === 'string'
              ? trainingDescription
              : documentToReactComponents(trainingDescription, options)}
          </Grid>

          <Grid item xs={12} className='gallery'>
            <GridList cols={2}>
              {images.map((image, index) => (
                <GridListTile key={index} onClick={handleClickOnImage}>
                  <img
                    data-image-index={index}
                    className='gallery__image-preview'
                    src={image.src}
                    alt='training'
                    loading='lazy'
                  />
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(TrainingDescription);
