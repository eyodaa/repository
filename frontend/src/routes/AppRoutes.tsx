import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import ApplicationsPage from "../pages/Applications/ApplicationsPage";
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
                    <Route path="/capabilities/:id" element={<CapabilityDetailsPage />} />
                    <Route path="/processes" element={<ProcessesPage />} />
                    <Route path="/processes/:id" element={<BusinessProcessDetailsPage />} />
                    <Route path="/graph/:id" element={<GraphPage />} />
                    <Route
                        path="/graph/:artifactType/:id"
                        element={<GraphPage />}
                    />
                    <Route path="/graph" element={<EnterpriseMapPage />} />
                    <Route
                        path="/applications/:id/tco"
                        element={<TCOAssessmentPage />}
                    />
                    <Route
                        path="/impact/:id"
                        element={<ImpactAnalysisPage />}
                    />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}