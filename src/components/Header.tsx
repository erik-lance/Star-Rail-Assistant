import React from 'react';

const Header = () => {
    return (
        <div className='w-full flex flex-row justify-between items-center p-4'>
            <a className='text-2xl font-bold' href='/'>Star Rail Assistant</a>
            <div className='flex flex-row space-x-4'>
                <a href='history'>Wish History</a>
                <a href='import'>Import</a>
                <a href='export'>Export</a>
                <a href='about'>About</a>
                <a href='faq'>FAQ</a>
                <a href='contact'>Contact</a>
                <a href='player'>Player</a>
            </div>
        </div>
    );
};

export default Header;