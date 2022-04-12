import Head from "next/head"
import Navigation from "./Navigation"

const Layout = ({ children }) => (
    <>
        <Head>
            <title>My Gundam App</title>
        </Head>
        <Navigation />
        {children}
    </>
)

export default Layout