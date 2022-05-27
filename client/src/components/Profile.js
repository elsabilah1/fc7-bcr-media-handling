import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../store/actions/authActions';
import { logout } from '../utils/api';
import Button from './Button';
import Text from './Text';

export default function Profile() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUserData());
    });

    const handleLogout = () => {
        logout();
        nav('/');
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 font-bold">
                {data?.firstName[0]?.toUpperCase()}
            </div>
            <div className="capitalize">
                <Text type="normal">{data?.firstName + ' ' + data?.lastName}</Text>
            </div>
            <Button title="Logout" onClick={handleLogout} type="secondary" />
        </div>
    );
}
