import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { useState, useEffect, useMemo } from 'preact/hooks';
import { Fragment } from 'preact';
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
  const [currentTraining, setCurrentTraining] = useState(null);

  const [imagesArray, setImagesArray] = useState([]);
  const [currentImage, setImage] = useState(0);

  const [isOpenModal, setIsModalOpen] = useState(false);
  const [isOpenViewer, setIsViewerOpen] = useState(false);

  const handleClickOnImage = (imageIndex) => {
    setImage(Number(imageIndex));

    setIsModalOpen(false);

    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);

    setIsModalOpen(true);

    setImage(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setCurrentTraining(null);
  };

  const handleOpenModal = (trainingId) => () => {
    const indexOfTraining = tableData && tableData
      .map((row) => row.id)
      .indexOf(Number(trainingId));

    if (!isNaN(Number(indexOfTraining)) && indexOfTraining !== null) {
      setIsModalOpen(true);
      setCurrentTraining(indexOfTraining);
    }
  };

  const trainingName = useMemo(() => tableData[currentTraining]
    ? tableData[currentTraining].typeOfTraining
    : '', [currentTraining]);

  const trainingDescription = useMemo(() => tableData[currentTraining]
    ? tableData[currentTraining].trainingDescription
    : '', [currentTraining]);

  const renderViewer = () => {
    if (typeof window === 'undefined') return <Fragment />;

    // eslint-disable-next-line
    const Viewer = (require('react-viewer')).default;

    return typeof document !== 'undefined' && (
      <Viewer
        visible={isOpenViewer}
        images={imagesArray}
        activeIndex={currentImage}
        drag
        zIndex={1000}
        rotatable={false}
        attribute={false}
        scalable={false}
        noNavbar
        onClose={handleCloseViewer}
      />
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const entry = await client.getEntries({ content_type: 'training' });

        setTableData(entry.items.map(({ fields }) => fields));

        const { fields } = await client.getEntry('15efANJioHRlZjQUZEK5vJ');

        if (fields.background && fields.background.fields) {
          document.body.style.background = `url("${fields.background.fields.file.url}") no-repeat center center fixed`;
          document.body.style.backgroundSize = 'cover';
        }

        setDescriptionData(fields);

        if (typeof window !== 'undefined') {
          window.document.title = fields.title;
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentTraining !== null && tableData[currentTraining]) {
      setImagesArray(getImages(tableData[currentTraining].examples));
    } else {
      setImagesArray([]);
    }
  }, [currentTraining]);

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
          <Grid container spacing={2} justify='center'>
            {
              tableData.map((row) => (
                <Grid item xs={9} sm={6} md={4} lg={2} key={row.id}>
                  <TrainingCard data={row} onOpenTraining={handleOpenModal} />
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>

      <TrainingDescription
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        onImageClick={handleClickOnImage}
        trainingName={trainingName}
        trainingDescription={trainingDescription}
        images={imagesArray}
      />

      {renderViewer()}
    </Container>
  );
};

export default Main;
