import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import ApplicationsPage from "../pages/Applications/ApplicationsPage";
import ApplicationLandscapePage from "../pages/Applications/ApplicationLandscapePage";
import TechnologiesPage from "../pages/Technologies/TechnologiesPage";
import CapabilitiesPage from "../pages/Capabilities/CapabilitiesPage";
import ProcessesPage from "../pages/Processes/ProcessesPage";
import ApplicationDetailsPage from "../components/application/ApplicationDetails";
import TechnologyDetailsPage from "../pages/Technologies/TechnologyDetailsPage";
import CapabilityDetailsPage from "../pages/Capabilities/CapabilityDetailsPage";
import GraphPage from "../pages/Graph/GraphPage";
import EnterpriseMapPage from "../pages/Graph/EnterpriseMapPage";
import TCOAssessmentPage from "../pages/tco/TCOAssessmentPage";
import BusinessProcessDetailsPage from "../pages/Processes/BusinessProcessDetailsPage";
import ImpactAnalysisPage from "../pages/impact/ImpactAnalysisPage";
import BlueprintPage from "../pages/blueprint/BlueprintPage";
import LoginPage from "../pages/Auth/LoginPage";
import UnauthorizedPage from "../pages/Auth/UnauthorizedPage";
import AuthGuard from "../context/AuthGuard";
import UsersPage from "../pages/Users/UsersPage";

import { useAuth } from "../context/AuthContext";

function IndexRedirect() {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    if (user.role === 'APPLICATION_ADMIN') return <Navigate to="/applications" replace />;
    if (user.role === 'TECHNOLOGY_ADMIN') return <Navigate to="/technologies" replace />;
    if (user.role === 'PROCESS_ADMIN') return <Navigate to="/processes" replace />;
    if (user.role === 'BUSINESS_ADMIN') return <Navigate to="/capabilities" replace />;
    return <Navigate to="/dashboard" replace />;
}

function MainLayoutWrapper() {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                
                <Route element={<AuthGuard />}>
                    <Route element={<MainLayoutWrapper />}>
                        <Route path="/" element={<IndexRedirect />} />
                        
                        <Route element={<AuthGuard allowedRoles={['SYSTEM_ADMIN']} />}>
                            <Route path="/dashboard" element={<DashboardPage />} />
                        </Route>
                        
                        <Route element={<AuthGuard allowedRoles={['APPLICATION_ADMIN']} />}>
                            <Route path="/applications" element={<ApplicationsPage />} />
                            <Route path="/applications/landscape" element={<ApplicationLandscapePage />} />
                            <Route path="/applications/:id" element={<ApplicationDetailsPage />} />
                            <Route path="/applications/:id/tco" element={<TCOAssessmentPage />} />
                        </Route>

                        <Route element={<AuthGuard allowedRoles={['TECHNOLOGY_ADMIN']} />}>
                            <Route path="/technologies" element={<TechnologiesPage />} />
                            <Route path="/technologies/:id" element={<TechnologyDetailsPage />} />
                        </Route>

                        <Route element={<AuthGuard allowedRoles={['BUSINESS_ADMIN']} />}>
                            <Route path="/capabilities" element={<CapabilitiesPage />} />
                            <Route path="/capabilities/:id" element={<CapabilityDetailsPage />} />
                        </Route>

                        <Route element={<AuthGuard allowedRoles={['PROCESS_ADMIN']} />}>
                            <Route path="/processes" element={<ProcessesPage />} />
                            <Route path="/processes/:id" element={<BusinessProcessDetailsPage />} />
                        </Route>

                        <Route element={<AuthGuard allowedRoles={['SYSTEM_ADMIN']} />}>
                            <Route path="/users" element={<UsersPage />} />
                        </Route>

                        <Route path="/graph/:id" element={<GraphPage />} />
                        <Route path="/graph/:artifactType/:id" element={<GraphPage />} />
                        <Route path="/graph" element={<EnterpriseMapPage />} />
                        <Route path="/impact/:id" element={<ImpactAnalysisPage />} />
                        <Route path="/blueprint/:id" element={<BlueprintPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}