import { memo } from 'react';
import './Home.scss'
import MyTeam from './MyTeam/MyTeam';
import Feature from './Feature/Feature';

function Home() {
    return (
        <>
            <Feature />
            <MyTeam />
        </>
    );
}

export default memo(Home);