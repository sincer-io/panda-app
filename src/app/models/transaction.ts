import { Category } from './category';
import { Tag } from './tag';

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
    createdAt: string;
    updatedAt: string;
}
