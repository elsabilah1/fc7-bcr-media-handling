import { useEffect } from 'react';
import { Menu } from 'react-feather';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getAuth, setAuth } from '../../../utils/api';
import Button from '../../Button';
import Profile from '../../Profile';
import Logo from './Logo';
import NavLinks from './NavLinks';

export default function Header({ setMenu }) {
    const [searchParams] = useSearchParams();
    const nav = useNavigate();

    useEffect(() => {
        if (searchParams.get('token')) {
            setAuth({ token: `${searchParams.get('token')}` });
            nav('/');
        }
    });

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 md:pb-10">
            <div className="md:flex md:justify-between">
                <div className="flex justify-between">
                    <Logo />
                    <button className="md:hidden" onClick={() => setMenu(true)}>
                        <Menu />
                    </button>
                </div>
                <div className="hidden flex-row items-center gap-8 md:flex">
                    <NavLinks />
                    {getAuth() ? (
                        <Profile />
                    ) : (
                        <Link to="/register">
                            <Button title="Register" type="secondary" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
