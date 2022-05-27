import { Search } from 'react-feather';
import Button from '../../Button';

export default function SearchField() {
    return (
        <div className="flex">
            <div className="flex items-center rounded-sm border border-gray-300 px-2">
                <Search className="text-gray-300" size={20} />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-40 border-0 px-2 text-sm placeholder:text-gray-400 focus:ring-0"
                />
            </div>
            <Button title="Search" type="outlined" />
        </div>
    );
}
