import { useState, useEffect } from 'react';

const useMember = () => {
    const getToken = () => {
        const memberString = localStorage.getItem('member');
        const memberToken = (memberString === undefined || memberString === null) ? null : JSON.parse(memberString);
        console.log('memberToken?', memberToken)
        return memberToken
    }

    const [member, setMember] = useState(getToken());

    const saveMember = (memberToken: any) => {
        console.log('in saveMember token ', memberToken)
        localStorage.setItem('member', JSON.stringify(memberToken));
        setMember(memberToken);
    }

    const deleteMember = () => {
        localStorage.removeItem('member')
        setMember(null);
    }

    useEffect(() => {
        console.log('member is changed!', member)
        //setMember(member)
    }, [member])

    return {
        member,
        setMember: saveMember,
        deleteMember: deleteMember,
        // seveMember: saveMember,
    }

}

export default useMember;