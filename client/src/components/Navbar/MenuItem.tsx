import React from 'react'

interface MenuItemsPropes{
    onClick:() => void;
    label:string;
    style?: string;
}
const MenuItem :React.FC<MenuItemsPropes> = ({
    onClick,
    label,
    style
    }) =>{
    return(
        <div onClick={onClick} className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${style}` }>
                {label}
        </div>
    )
}


export default MenuItem