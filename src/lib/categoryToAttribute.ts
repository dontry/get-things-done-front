import { Category, Attribute } from 'src/types';

export function categoryToAttribute(_category: Category): Attribute {
  switch (_category) {
    case 'inbox':
      return 'inbox';
    case 'next':
      return 'next';
    case 'today':
    case 'tomorrow':
    case 'scheduled':
      return 'plan';
    case 'note':
      return 'note';
    case 'someday':
      return 'noplan';
    default:
      return 'inbox';
  }
}