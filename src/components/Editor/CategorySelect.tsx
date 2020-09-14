import { Button, Calendar, Select } from 'antd';
import { capitalize } from 'lodash';
import moment, { Moment } from 'moment';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Attribute, Category } from 'src/types';

import { CATEGORY_OPTIONS } from '../../constants/misc';
import { categoryToAttribute } from '../../lib/categoryToAttribute';
import { getToday, getTomorrow } from '../../lib/date';
import { CalendarWrapper, SelectWrapper } from './style';

export interface IUpdateCategoryPayload {
  attribute: Attribute;
  startTime: number;
}

interface ICategorySelectProps {
  initCategory: Category;
  startTime?: number;
  onChange(payload: IUpdateCategoryPayload): void;
}

const CategorySelect = ({ initCategory, startTime, onChange }: ICategorySelectProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startAt, setStartAt] = useState(startTime);
  const [category, setCategory] = useState(initCategory);
  const selectRef = useRef<Select<string>>(null);

  const onCategorySelect = (value: string): void => {
    const _category = value as Category;
    if (_category !== 'scheduled') {
      if (_category === category) {
        selectRef.current!.blur();
      }
      const attribute = categoryToAttribute(_category);
      const _startTime = getStartTimeByCategory(_category);
      onChange({ attribute, startTime: _startTime });
      selectRef.current!.blur();
    } else {
      setCalendarOpen(true);
    }
    setCategory(_category);
  };

  const onFocus = () => {
    setOpen(true);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const onDateChange = useCallback(
    (_date?: Moment) => {
      if (_date) {
        setStartAt(_date.unix() * 1000);
      }
    },
    [setStartAt],
  );

  const onConfirmDate = useCallback(() => {
    onChange({ attribute: 'plan', startTime: startAt || 0 });
    setCalendarOpen(false);
    setOpen(false);
  }, [onChange, setCalendarOpen, setOpen, startAt]);

  const getStartTimeByCategory = (_category: Category): number => {
    switch (_category) {
      case 'today':
        return getToday();
      case 'tomorrow':
        return getTomorrow();
      default:
        return 0;
    }
  };

  return (
    <SelectWrapper>
      <Select
        ref={selectRef}
        defaultValue={initCategory}
        open={open}
        onFocus={onFocus}
        onBlur={handleBlur}
        onSelect={onCategorySelect}
      >
        {CATEGORY_OPTIONS.map(option => (
          <Select.Option key={option} title={getCategoryText(option, startTime)} value={option}>
            {t(option)}
          </Select.Option>
        ))}
      </Select>
      {calendarOpen && (
        <CalendarWrapper>
          <Calendar
            fullscreen={false}
            onSelect={onDateChange}
            defaultValue={startTime === 0 ? moment() : moment(startTime)}
          />
          <Button type='primary' style={{ width: '100%' }} onClick={onConfirmDate}>
            OK
          </Button>
        </CalendarWrapper>
      )}
    </SelectWrapper>
  );

  function getCategoryText(_category: string, _startTime: number = 0) {
    if (_category === 'scheduled' && _startTime > 0) {
      return moment(_startTime).format('DD/MM/YYYY');
    } else {
      return capitalize(_category);
    }
  }
};

export default CategorySelect;
