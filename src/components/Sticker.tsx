import React from 'react'

function avatar_link(_name: string) {
    // Converts spaces to underscores
    let parsed_name: string = _name.replaceAll(' ', '_');

    // Get link to character icon in public/avatar_icons folder
    const link: string = "/stickers/" + parsed_name + ".png";


    return link;
    // TODO: Add support for non character icons.
}

const Sticker = ({ name }: { name: string }) => {
    return (
        <img
            src={avatar_link(name)}
            alt={name}
            className='h-full'
        />
    );
}

export default Sticker;