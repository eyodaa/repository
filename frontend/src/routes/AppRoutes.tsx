import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import ApplicationsPage from "../pages/Applications/ApplicationsPage";
import TechnologiesPage from "../pages/Technologies/TechnologiesPage";
import CapabilitiesPage from "../pages/Capabilities/CapabilitiesPage";
import ProcessesPage from "../pages/Processes/ProcessesPage";
import ApplicationDetailsPage from "../components/application/ApplicationDetails";
import TechnologyDetailsPage from "../pages/Technologies/TechnologyDetailsPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/applications" element={<ApplicationsPage />} />
                    <Route path="/applications/:id" element={<ApplicationDetailsPage />} />
                    <Route path="/technologies" element={<TechnologiesPage />} />
                    <Route path="/technologies/:id" element={<TechnologyDetailsPage />} />
                    <Route path="/capabilities" element={<CapabilitiesPage />} />
                    <Route path="/processes" element={<ProcessesPage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}