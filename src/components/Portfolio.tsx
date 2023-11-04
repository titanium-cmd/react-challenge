import { Box } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Page from './Page';

const Portfolio = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Box mt="20px">
        <Page />
      </Box>
    </DndProvider>
  );
};

export default Portfolio;
