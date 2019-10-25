import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { useState, useEffect } from 'preact/hooks';
import keys from './keys.json';
import { Table, Heading, Description } from '../common';

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

  console.log(descriptionData);

  useEffect(() => {
    client
      .getEntries({ content_type: 'training' })
      .then((entry) => {
        setTableData(entry.items.map(({ fields }) => fields));
        console.log(tableData);
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
          <Table data={tableData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
