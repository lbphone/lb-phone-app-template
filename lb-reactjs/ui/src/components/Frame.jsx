import './Frame.css';

export default function Frame({ children }) {
    return (
        <div className='phone-frame'>
            <div className='phone-notch'></div>
            <div className='phone-content'>{children}</div>
        </div>
    );
}
