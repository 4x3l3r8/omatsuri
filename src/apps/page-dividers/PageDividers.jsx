import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/use-local-storage';
import useDocumentTitle from '../../hooks/use-document-title';
import Settings from './Settings/Settings';
import Preview from './Preview/Preview';

const INITIAL_VALUES = {
  type: 'waves_opaque',
  direction: 'normal',
  position: 'top',
  width: 125,
  height: 75,
  color: '#ffffff',
};

export default function PageDividers() {
  useDocumentTitle('Curved page dividers');

  const ls = useLocalStorage({ key: '@omatsuri/page-dividers', delay: 1000 });
  const initialValues = ls.retrieve() || INITIAL_VALUES;

  const [type, setType] = useState(initialValues.type);
  const [color, setColor] = useState(initialValues.color);
  const [width, setWidth] = useState(initialValues.width);
  const [height, setHeight] = useState(initialValues.height);
  const [position, setPosition] = useState(initialValues.position);
  const [direction, setDirection] = useState(initialValues.direction);

  useEffect(() => {
    ls.save({ direction, width, height, color, position, type });
  }, [direction, width, height, color, position, type]);

  const values = { type, color, width, height, position, direction };
  const handlers = {
    onTypeChange: setType,
    onColorChange: setColor,
    onWidthChange: setWidth,
    onHeightChange: setHeight,
    onPositionChange: setPosition,
    onDirectionChange: setDirection,
  };

  return (
    <div>
      <Settings values={values} handlers={handlers} />
      <Preview values={values} />
    </div>
  );
}
