import React from 'react';
import { Button, ButtonProps } from '@patternfly/react-core';
import { MinusCircleIcon } from '@patternfly/react-icons';
import { useField, filterDOMProps, joinName } from 'uniforms/es5';

export type ListDelFieldProps<T> = {
  name: string;
  parent?: any;
  value?: T;
} & Omit<ButtonProps, 'isDisabled'>;

function ListDel<T>(rawProps: ListDelFieldProps<T>) {
  const [props] = useField<ListDelFieldProps<T>, T>(rawProps.name, rawProps);

  const nameParts = joinName(null, props.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const [parent] = useField<{ minCount?: number }, T[]>(parentName, {});
  const parentValue = parent.value ?? [];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const fieldIndex = +nameParts[nameParts.length - 1];
  const limitNotReached =
    !props.disabled && !(parent.minCount! >= parentValue.length);

  return (
    <Button
      disabled={!limitNotReached || rawProps.disabled}
      variant="plain"
      style={{ paddingLeft: '0', paddingRight: '0'}}
      onClick={() => {
        if (limitNotReached) {
          const value = parentValue.slice();
          value.splice(fieldIndex, 1);
          parent.onChange(value);
        }
      }}
      {...filterDOMProps(props)}
    >
      <MinusCircleIcon color="#cc0000" />
    </Button>
  );
}

export default ListDel;
