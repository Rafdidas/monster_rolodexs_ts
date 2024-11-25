import { ChangeEvent, } from 'react';

import './search-box.styles.css';

type SearchBoxProps = {
    className: string;
    placeholder?: string;
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ placeholder, className, onChangeHandler }: SearchBoxProps) => {
    return (
        <input 
            className={`search-box ${className}`} 
            type="search" 
            placeholder={placeholder}
            onChange={onChangeHandler} 
        />
    );
}

export default SearchBox;