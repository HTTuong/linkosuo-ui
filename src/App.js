import React from 'react';
import { publicRoutes } from './routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoToTop from './components/GoToTop';

function App() {
    const routeList = publicRoutes.map((route, index) => {
        const Layout = route.layout;
        const Page = route.component;
        const data = route.data ? route.data : null;

        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <Layout>
                        <Page data={data} />
                    </Layout>
                }
            />
        );
    });

    return (
        <div className="App">
            <Router>
                <Routes>{routeList}</Routes>
                <GoToTop />
            </Router>
        </div>
    );
}

export default App;
