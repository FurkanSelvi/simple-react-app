import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select } from '../elements';
import { getAsync, postAsync } from '../../helpers/Api';
import useDidMount from '../../helpers/useDidMount';

export const SelectValue = (
  context,
  {
    defaultVal,
    fetchUrl,
    divClass,
    isMulti,
    isClearable,
    params,
    noParent,
    divStyle,
    mapper,
    label,
    method,
    defValue,
    disabled,
    noFetchVal,
    addOptions,
    baseURL
  },
) => {
  const { t } = context;
  const [mount, setMount] = useState(false);
  const [values, setValues] = useState({ items: [], selected: !!isMulti ? [] : null, loading: false, error: '' });
  const selectedValue = values.selected;
  const paramData = JSON.stringify(params && params.data);
  const noFetchValJ = JSON.stringify(noFetchVal);
  const defValueJ = JSON.stringify(defValue);

  useEffect(() => {
    setMount(true);
    if (noParent) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (noFetchVal) {
      setValues(s => ({ items: [noFetchVal], selected: !!isMulti ? [noFetchVal] : noFetchVal }));
    }
  }, [noFetchValJ]);

  useEffect(() => {
    if (mount) {
      if (!noParent && params && params.data && params.required && !params.required.map(d => !!params.data[d]).filter(t => !t).length) {
        fetchData();
      }
    }
  }, [noParent, paramData]);

  useDidMount(() => {
    if (defValue && defValue.length) {
      const s2 = values.items.filter(s => defValue.includes(s.value));
      const s = s2[0] ? (!!isMulti ? s2 : s2[0]) : null;
      if (s) {
        setValues(d => ({ ...d, selected: s }));
      }
    }
  }, [defValueJ]);

  const fetchData = async () => {
    setValues(d => ({ ...d, items: [], selected: !!isMulti ? [] : null, loading: true }));
    let response = {};
    if (method == 'post') response = await postAsync(fetchUrl, (params && params.data) || {}, baseURL);
    else response = await getAsync(fetchUrl, { params: (params && params.data) || {} }, baseURL);
    let v = [];
    if (mapper) {
      v = (response && response.data && response.data.map(mapper)) || [];
    } else {
      v = (response && response.data && response.data) || [];
    }
    let s = defaultVal && !defaultVal.value ? v[0] || null : defaultVal;
    if (defValue) {
      const s2 = v.filter(s => defValue.includes(s.value));
      s = s2[0] ? (!!isMulti ? s2 : s2[0]) : s;
    }
    setValues(d => ({ ...d, items: v, selected: s, loading: false }));
  };

  const setSelected = (data, e) => {
    // const action = e.action === 'select-option' ? 'add' : 'remove';
    // const selected = e.removedValue || e.option;
    setValues(d => ({ ...d, selected: data }));
  };

  const renderSelect = () => {
    return (
      <div style={divStyle} className={divClass ? divClass : 'box-1-5 m-0'}>
        <Select
          isMulti={!!isMulti}
          allowSelectAll={!!isMulti}
          isLoading={values.loading}
          renderLoadingIndicator={() => null}
          placeholder={label}
          isClearable={!!isClearable}
          isDisabled={values.items.length == 0 || !!disabled}
          value={values.selected}
          onChange={setSelected}
          options={addOptions ? [...addOptions, ...values.items] : values.items}
        />
      </div>
    );
  };

  return { renderSelect, selectedValue };
};

SelectValue.contextTypes = {};

SelectValue.defaultProps = {};

SelectValue.propTypes = {
  fetchUrl: PropTypes.string,
};
