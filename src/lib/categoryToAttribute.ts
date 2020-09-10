import { Attribute, Category } from 'src/types';

export function categoryToAttribute(_category: Category): Attribute {
  switch (_category) {
    case 'inbox':
      return 'inbox';
    case 'next':
      return 'next';
    case 'note':
      return 'note';
    case 'today':
    case 'tomorrow':
    case 'scheduled':
      return 'plan';
    case 'someday':
      return 'noplan';
    default:
      return 'inbox';
  }
}
