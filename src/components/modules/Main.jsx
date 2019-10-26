import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { useState, useEffect } from 'preact/hooks';
import { Fragment } from 'preact';
import Viewer from 'react-viewer';
import keys from './keys.json';
import { Table, Heading, Description, TrainingDescription, TrainingCard } from '../common';
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
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [currentTraining, setCurrentTraining] = useState(0);
  const [currentImage, setImage] = useState(0);
  const [isOpenViewer, setIsViewerOpen] = useState(false);

  const handleClickOnImage = (imageIndex) => {
    setImage(imageIndex);
    setIsModalOpen(false);
    setIsViewerOpen(true);
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

    setIsModalOpen(true);
  };

  useEffect(() => {
    client
      .getEntries({ content_type: 'training' })
      .then((entry) => {
        console.log(entry.items.map(({ fields }) => fields));
        setTableData(entry.items.map(({ fields }) => fields));
      })
      .catch((err) => {
        console.error(err);
      });

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

        <Grid item xs={12} lg={12} className='table-block'>
          <Table data={tableData} onOpenTraining={handleOpenModal} />
        </Grid>

        <Grid item xs={12} lg={12} className='cards-block'>
          {
            tableData.map((row) => (
              <Grid item xs={9} sm={6} md={4} lg={2} key={row.id}>
                <TrainingCard data={row} onOpenTraining={handleOpenModal} />
              </Grid>
            ))
          }
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
        images={tableData[currentTraining]
          && tableData[currentTraining].examples
          ? getImages(tableData[currentTraining].examples)
          : []}
      />

      {typeof document !== 'undefined'
        ? (
          <Viewer
            visible={isOpenViewer}
            images={tableData[currentTraining]
              && tableData[currentTraining].examples
              ? getImages(tableData[currentTraining].examples)
              : []}
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
