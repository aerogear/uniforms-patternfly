import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Button, ButtonProps } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { useField, filterDOMProps, joinName } from 'uniforms/es5';

export type ListAddFieldProps<T> = {
  initialCount?: number;
  parent?: any;
  name: string;
  disabled?: boolean;
  value?: T;
} & Omit<ButtonProps, 'isDisabled'>;

function ListAdd<T>(rawProps: ListAddFieldProps<T>) {
  const [props] = useField<ListAddFieldProps<T>, T>(rawProps.name, rawProps);

  const nameParts = joinName(null, props.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const [parent] = useField<{ maxCount?: number }, T[]>(parentName, {});
  const parentValue = parent.value ?? [];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const limitNotReached =
    !props.disabled && !(parent.maxCount! <= parentValue.length);

  return (
    <Button
      variant="plain"
      style={{ paddingLeft: '0', paddingRight: '0'}}
      disabled={!limitNotReached || rawProps.disabled}
      onClick={() => {
        if (limitNotReached)
          parent.onChange(parentValue.concat([cloneDeep(props.value!)]));
      }}
      {...filterDOMProps(props)}
    >
      <PlusCircleIcon color="#0088ce" />
    </Button>
  );
}

export default ListAdd;
