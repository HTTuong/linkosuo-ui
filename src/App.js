import React, { Fragment } from 'react';
import { publicRoutes, privateRoutes, authRoutes } from './routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from './store/redux/auth';
import { useCallback } from 'react';
import GoToTop from './components/GoToTop';

function App() {
    const token = localStorage.getItem('access_token');
    const dispatch = useDispatch();

    let routesList = publicRoutes.concat(authRoutes);

    if (token) {
        routesList = publicRoutes.concat(privateRoutes);
        dispatch(authActions.addLoginInfo({ token: token }));
    }

    const routeList = useCallback(() => {
        return routesList.map((route, index) => {
            const Layout = route.layout ? route.layout : Fragment;
            const Page = route.component;

            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <Layout>
                            <Page />
                        </Layout>
                    }
                />
            );
        });
    }, [routesList]);

    return (
        <div className="App">
            <Router>
                <Routes>{routeList()}</Routes>
                <GoToTop />
            </Router>
        </div>
    );
}

export default App;
