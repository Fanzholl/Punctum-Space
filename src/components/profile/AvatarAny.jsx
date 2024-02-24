import React from 'react';
import { observer } from 'mobx-react-lite';

const AvatarAny = ({avatarUrl}) => {
    return (
        <div className='pImg' style={{ backgroundImage: `url(${avatarUrl !== 'false' ? avatarUrl : 'http://punctum.space:8002/uploads/avatars/default.jpg'})` }}>

        </div>
    );
};

export default observer(AvatarAny);