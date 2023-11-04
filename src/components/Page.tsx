import { Box } from '@mui/material';
import React from 'react';
import { useDrop } from 'react-dnd';

import { GUTTER_SIZE } from '../constants';
import Grid from './Grid';
import Module from './Module';

const Page = () => {
  const [additionalHeight] = React.useState(0);
  const [modules, setModules] = React.useState([
    { id: 1, coord: { x: 1, y: 80, w: 2, h: 200 } },
    { id: 2, coord: { x: 5, y: 0, w: 3, h: 100 } },
    { id: 3, coord: { x: 4, y: 310, w: 3, h: 200 } },
  ]);

  const containerRef = React.useRef<HTMLDivElement>();

  // Wire the module to DnD drag system
  const [, drop] = useDrop({ accept: 'module' });
  drop(containerRef);

  // Calculate container height
  const containerHeight = React.useMemo(() => (
    Math.max(...modules.map(({ coord: { y, h } }) => y + h)) + GUTTER_SIZE * 2 + additionalHeight
  ), [modules, additionalHeight]);

  console.log('modules::: ', modules);

  return (
    <Box
      ref={containerRef}
      position="relative"
      width={1024}
      height={containerHeight}
      margin="auto"
      sx={{
        overflow: 'hidden',
        outline: '1px dashed #ccc',
        transition: 'height 0.2s',
      }}
    >
      <Grid height={containerHeight} />
      {modules.map((module) => (
        <Module key={module.id} data={module} getModulePositions={(topPos: number, leftPos: number,) => {
          const otherModules = modules.filter((_module) => _module.id !== module.id);
          setModules([...otherModules, { ...module, coord: { ...module.coord, x: leftPos, y: topPos } }])          
        }} />
      ))}
    </Box>
  );
};

export default React.memo(Page);
