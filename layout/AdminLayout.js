import Head from "next/head";
import { ToastContainer } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children, pagina }) {
    const pageTitle = `Café - ${pagina}`

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Quiosco Cafetería"/>
            </Head>

            <div className="md:flex">
                    <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 py-5">
                        <AdminSidebar />
                    </aside>

                    <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                        <div className="p-10">
                            {children}
                        </div>
                    </main>
            </div>
            <ToastContainer />
    </>
  );
}