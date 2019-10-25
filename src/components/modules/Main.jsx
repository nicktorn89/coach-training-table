import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { useState, useEffect } from 'preact/hooks';
import { Fragment } from 'preact';
import Viewer from 'react-viewer';
import keys from './keys.json';
import { Table, Heading, Description, TrainingDescription } from '../common';
import { getImages } from './utils';

const contentful = require('contentful');

const client = contentful.createClient({ ...keys });

const Main = () => {
  const [tableData, setTableData] = useState([]);
  const [descriptionData, setDescriptionData] = useState({
    title: '',
    subtitle: '',
    photo: {
      fields: {
        file: {
          url: '',
        },
      },
    },
  });
  const [isOpenModal, setIsModalOpen] = useState(true);
  const [currentTraining, setCurrentTraining] = useState(0);
  const [currentImage, setImage] = useState(0);
  const [isOpenViewer, setIsViewerOpen] = useState(false);

  const handleClickOnImage = (e) => {

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = ({ target }) => {
    const { trainingId } = target.dataset;

    const indexOfTraining = tableData && tableData
      .map((row) => row.id)
      .indexOf(Number(trainingId));

    setIsModalOpen(true);
    setCurrentTraining(indexOfTraining ? indexOfTraining : 0);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  useEffect(() => {
    client
      .getEntries({ content_type: 'training' })
      .then((entry) => {
        setTableData(entry.items.map(({ fields }) => fields));
        console.log(entry);
      })
      .catch((err) => console.error(err));

    client
      .getEntry('15efANJioHRlZjQUZEK5vJ')
      .then(({ fields }) => {
        setDescriptionData(fields);

        window.document.title = fields.title;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Container maxWidth='lg' className='main-container'>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={2} className='photo-block'>
          <Avatar style={{ height: 150, width: 150 }} src={descriptionData.photo.fields.file.url} />
        </Grid>

        <Grid item xs={12} lg={10}>
          <Heading text={descriptionData.title} />
          <Description text={descriptionData.subtitle} />
        </Grid>

        <Grid item xs={12} lg={12}>
          <Table data={tableData} onOpenTraining={handleOpenModal} />
        </Grid>
      </Grid>

      <TrainingDescription
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        onImageClick={handleClickOnImage}
        trainingName={tableData[currentTraining]
          ? tableData[currentTraining].typeOfTraining
          : ''}
        trainingDescription={tableData[currentTraining]
          ? tableData[currentTraining].trainingDescription
          : ''}
        images={tableData[currentTraining] ? getImages(tableData[currentTraining].examples) : []}
      />

      {typeof document !== 'undefined'
        ? (
          <Viewer
            visible={isOpenViewer}
            images={tableData[currentTraining] ? getImages(tableData[currentTraining].examples) : []}
            activeIndex={currentImage}
            drag
            zIndex={1000}
            rotatable={false}
            attribute={false}
            scalable={false}
            noNavbar
            onClose={handleCloseViewer}
          />
        )
        : <Fragment />}
    </Container>
  );
};

export default Main;
