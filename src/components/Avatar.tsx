import React from 'react'

function avatar_link(_name: string) {
    // Converts spaces to underscores
    console.log("Converting avatar_link "+_name)
    let parsed_name: string = _name.replaceAll(' ', '_');
    return `https://static.wikia.nocookie.net/houkai-star-rail/images/a/a3/Character_${parsed_name}_Icon.png`;
}

const Avatar = (name: string) => {
    return (
        <div
            className='p-2 m-1 rounded-lg bg-black flex flex-col'
        >
            <img
                src={avatar_link(name)}
                alt={name}
            />
        </div>
    );
}

export default Avatar;