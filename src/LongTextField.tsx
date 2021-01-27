import React, { Ref } from 'react';
import { TextArea, TextAreaProps } from '@patternfly/react-core';
import { connectField, filterDOMProps } from 'uniforms/es5';

export type LongTextFieldProps = {
  onChange: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputRef: Ref<HTMLInputElement>;
  value?: string;
  prefix?: string;
} & TextAreaProps;

const LongText = ({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  value,
  ...props
}) => (
  <div {...filterDOMProps(props)}>
    {label && <label htmlFor={id}>{label}</label>}
    <TextArea
      id={id}
      disabled={disabled}
      name={name}
      aria-label={name}
      // @ts-ignore
      onChange={(value, event) => onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      value={value ?? ''}
    />
  </div>
);

export default connectField(LongText);
