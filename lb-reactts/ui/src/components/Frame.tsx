import './Frame.css';

export default function Frame({ children }: any) {
    return (
        <div className='phone-frame'>
            <div className='phone-notch'></div>
            <div className='phone-content'>{children}</div>
        </div>
    );
}
