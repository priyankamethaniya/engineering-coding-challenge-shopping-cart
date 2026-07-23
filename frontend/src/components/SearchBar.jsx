function SearchBar({
    value,
    onChange
}){
    return (
        <input
            type="text"
            className="search-bar"
            placeholder="Search products..."
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
        />
    );
}

export default SearchBar;
