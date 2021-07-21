import React from 'react';
import { AutoField, ListItemField } from '../src';

import createContext from './_createContext';
import mount from './_mount';

test('<ListItemField> - works', () => {
  const element = <ListItemField name="x.1" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } })
  );

  expect(wrapper.find(ListItemField)).toHaveLength(1);
});

test('<ListItemField> - renders AutoField', () => {
  const element = <ListItemField name="x.1" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } })
  );

  expect(wrapper.find(AutoField)).toHaveLength(1);
});

test('<ListItemField> - renders children if specified', () => {
  const Child: () => null = jest.fn(() => null);

  const element = (
    <ListItemField name="x.1">
      <Child />
    </ListItemField>
  );
  mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } })
  );

  expect(Child).toHaveBeenCalledTimes(1);
});

test('<ListItemField> - renders ListDelField', () => {
  const element = <ListItemField name="x.1" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } })
  );

  expect(wrapper.find('ListDel')).toHaveLength(1);
  expect(wrapper.find('ListDel').prop('name')).toBe('x.1');
});
