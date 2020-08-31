import React, { useState, useRef } from 'react';
import { Select, Calendar } from 'antd';
import { SelectWrapper, CalendarWrapper } from './style';
import { CATEGORY_OPTIONS } from '../../constants/misc';
import { capitalize } from '../../lib/capitalize';
import moment, { Moment } from 'moment';
import { Category, Attribute } from 'src/types';
import { getToday, getTomorrow } from '../../lib/date';
import { categoryToAttribute } from '../../lib/categoryToAttribute';

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
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(initCategory);
  const selectRef = useRef<Select<string>>(null);

  const handleCategoryChange = (value: string): void => {
    const _category = value as Category;
    if (_category !== 'scheduled') {
      const attribute = categoryToAttribute(_category);
      const _startTime = getStartTimeByCategory(_category);
      onChange({ attribute, startTime: _startTime });
      selectRef.current!.blur();
    }
    setCategory(_category);
  };

  const handleFocus = () => {
    setOpen(true);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const handleCalendarChange = (date?: Moment) => {
    if (date) {
      const _startTime: number = date.unix();
      onChange({ attribute: 'plan', startTime: _startTime });
      setOpen(false);
      selectRef.current!.blur();
    }
  };

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
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleCategoryChange}
      >
        {CATEGORY_OPTIONS.map(option => (
          <Select.Option value={option}>{capitalize(option)}</Select.Option>
        ))}
      </Select>
      {category === 'scheduled' && (
        <CalendarWrapper>
          <Calendar fullscreen={false} onChange={handleCalendarChange} value={moment(startTime)} />
        </CalendarWrapper>
      )}
    </SelectWrapper>
  );
};

export default CategorySelect;
