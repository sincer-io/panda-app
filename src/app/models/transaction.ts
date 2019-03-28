import { Category } from './category';
import { Tag } from './tag';
import { Location } from './location';
import { Person } from './person';

export class Transaction {
    id: number;
    label: string;
    notes: string;
    date: string;
    isExtraneous: boolean;
    amount: number;
    category: Category;
    location: Location;
    tags: Tag[];
    people: Person[];
    createdAt: string;
    updatedAt: string;
}
