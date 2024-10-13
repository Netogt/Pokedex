import LeftSection from './LeftSection';
import RightSection from './RightSection';
import MiddleSection from './MiddleSection';

export default function MainSection() {
    return (
        <div className='mainPokedex'>
            <LeftSection />
            <MiddleSection />
            <RightSection />
        </div>
    )
};