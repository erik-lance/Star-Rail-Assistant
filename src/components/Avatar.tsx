import React from 'react'

function avatar_link(_name: string) {
    // Converts spaces to underscores
    console.log("Converting avatar_link " + _name)
    let parsed_name: string = _name.replaceAll(' ', '_');

    // Get link to character icon in public/avatar_icons folder
    const link: string = "/avatar_icons/" + parsed_name + ".png";


    return link;
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