import React from 'react'

function avatar_link(_name: string) {
    // Converts spaces to underscores
    console.log("Converting avatar_link " + _name)
    let parsed_name: string = _name.replaceAll(' ', '_');
    return `https://static.wikia.nocookie.net/houkai-star-rail/images/a/a3/Character_${parsed_name}_Icon.png`;
    // TODO: Add support for non character icons.
}

const Avatar = ({ name }: { name: string }) => {
    return (
        <img
            src={avatar_link(name)}
            alt={name}
            className='rounded-full h-full'
        />
    );
}

export default Avatar;