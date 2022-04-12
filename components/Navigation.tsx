import Link from 'next/link'
import SearchBox from './SearchBox'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Navigation = () => {
    const router = useRouter()
    const [isHome, setIsHome] = useState(false)

    useEffect(() => {
        if(router.pathname === '/' || router.pathname === '/search/[term]') setIsHome(true)
        else setIsHome(false)
    }, [router.pathname])   

    return(
        <div>
            <nav className='navbar'>
                <Link href='/'>
                    <a className='navbar-title'>Gundam Wiki App</a>
                </Link>
                <Link href='/newEntry'>
                    <a className='navbar-create'>Create Entry</a>
                </Link>                        
            </nav>
            {isHome && <SearchBox />}            
        </div>
    )
}

export default Navigation