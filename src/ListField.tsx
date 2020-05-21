import React, { Children, HTMLProps, ReactNode, isValidElement, cloneElement } from 'react';
import { Tooltip, Split, SplitItem } from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import { connectField, filterDOMProps, joinName } from 'uniforms/es5';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';
import { ListDelField } from '.';

export type ListFieldProps<T> = {
  value: T[];
  children?: ReactNode;
  addIcon?: any;
  error?: boolean;
  info?: boolean;
  errorMessage?: string;
  initialCount?: number;
  itemProps?: {};
  labelCol?: any;
  label: string;
  wrapperCol?: any;
  name: string;
  showInlineError?: boolean;
} & Omit<HTMLProps<HTMLDivElement>, 'children' | 'name'>;

filterDOMProps.register('minCount');

function ListField<T>({
  children,
  error,
  errorMessage,
  info,
  initialCount,
  itemProps,
  label,
  labelCol,
  name,
  showInlineError,
  wrapperCol,
  ...props
}: ListFieldProps<T>) {
  const value = props.value ?? [];
  return (
    <div {...filterDOMProps(props)}>
      <Split gutter="md">
        <SplitItem>
          {label && (
            <label>
              {label}
              {!!info && (
                <span>
                  &nbsp;
                  <Tooltip content={info}>
                    <OutlinedQuestionCircleIcon />
                  </Tooltip>
                </span>
              )}
            </label>
          )}
        </SplitItem>
        <SplitItem isFilled />
        <SplitItem>
          debugger;
          <ListAddField key="listAddField" name={`${name}.$`} initialCount={initialCount} />{' '}
          <ListDelField name={`${name}.$`} />
        </SplitItem>
      </Split>

      <div>
      {children
        ? value.map((item, index) =>
            Children.map(children, child =>
              isValidElement(child) && child.props.name
                ? cloneElement(child, {
                    key: index,
                    name: child.props.name.replace('$', '' + index),
                  })
                : child,
            ),
          )
        : value.map((item, index) => (
            <ListItemField
              key={index}
              name={'' + index}
              {...itemProps}
            />
          ))}
      </div>
    </div>
  );
}

ListField.defaultProps = { children: <ListItemField name="$" /> };

export default connectField<ListFieldProps<any>>(ListField);
