export default function Contact() {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-bold'>Contact</h1>
                <p className='text-xl'>If you have any questions, comments, or concerns, you may email me at &nbsp;
                    <a href='mailto:eriklance@gmail.com' className='text-blue'>
                        eriklance@gmail.com
                    </a>
                </p>

                <p>
                    You may also contact me on Discord at <b className='text-blue'>ransupi</b>.
                </p>

                <p>
                    You may also submit an issue on the &nbsp;
                    <a href='https://github.com/erik-lance/Star-Rail-Assistant' target='_blank' className='text-blue'>
                        GitHub repository
                    </a>.
                </p>
            </div>
        </div>
    );
}