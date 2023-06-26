import React from "react";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <div className='w-full flex flex-row justify-between items-center p-4'>
            <div>
                
            </div>
            <div className='flex flex-row space-x-4'>
                <a href='https://github.com/erik-lance/Star-Rail-Assistant' target='_blank'>
                    <AiFillGithub size={24} />
                </a>
            </div>
        </div>
    );
};

export default Footer;