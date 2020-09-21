import React from 'react';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import makeAnimated from "react-select/animated";

const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const allOption = {
  label: "Tümünü Seç",
  value: "*"
};

const ValueContainer = ({ children, ...props }) => {
  const currentValues = props.getValue();
  let toBeRendered = children;
  if (currentValues.some(val => val.value === allOption.value)) {
    toBeRendered = [[children[0][0]], children[1]];
  }

  return (
    <components.ValueContainer {...props}>
      {toBeRendered}
    </components.ValueContainer>
  );
};

const MultiValue = props => {
  let labelToBeDisplayed = `${props.data.label}, `;
  if (props.data.value === allOption.value) {
    labelToBeDisplayed = "Tümü Seçildi";
  }
  return (
    <components.MultiValue {...props}>
      <span>{labelToBeDisplayed}</span>
    </components.MultiValue>
  );
};

const animatedComponents = makeAnimated();

const FormSelect = (props, context) => {
  const { t } = context;
  const { noOptionsMessage, loadingMessage, noReplace } = props;
  const noOption = noOptionsMessage || (() => t('common.noResult'));
  const loadingText = loadingMessage || (() => t('common.loading'));
  let thisProps = {
    ...props,
    placeholder: props.placeholder || t('common.select'),
    value: props.value && Object.keys(props.value).length === 0 && props.value.constructor === Object ? null : props.value,
  };


  if (props.allowSelectAll)
    return <Select {...thisProps} noOptionsMessage={noOption} loadingMessage={loadingText}
      options={[props.allOption, ...props.options]}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option,
        MultiValue,
        ValueContainer,
        animatedComponents
      }}
      onChange={(selected, event) => {
        if (selected !== null && selected.length > 0) {
          if (selected[selected.length - 1].value === props.allOption.value) {
            return props.onChange([props.allOption, ...props.options]);
          }
          let result = [];
          if (selected.length === props.options.length) {
            if (selected.includes(props.allOption)) {
              result = selected.filter(
                option => option.value !== props.allOption.value
              );
            } else if (event.action === "select-option") {
              result = [props.allOption, ...props.options];
            }
            return props.onChange(result);
          }
        }

        return props.onChange(selected);
      }}
      onInputChange={(value, e) => {
        props.onInputChange(!noReplace && value.replace('i', 'İ') || value, e)
      }} />
  else
    return <Select {...thisProps} noOptionsMessage={noOption} loadingMessage={loadingText}
      onInputChange={(value, e) => {
        props.onInputChange(!noReplace && value.replace('i', 'İ') || value, e)
      }}
    />
};

FormSelect.defaultProps = {
  options: [],
  value: null,
  isClearable: true,
  isLoading: false,
  isDisabled: false,
  onInputChange: () => null,
  onChange: () => null,
  onFocus: () => null,
  onMenuScrollToBottom: () => null,
  placeholder: null,
  allOption: allOption,
  isMulti: false,
};

FormSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onMenuScrollToBottom: PropTypes.func,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
};

FormSelect.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default FormSelect;
