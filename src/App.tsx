import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Submit from "./pages/Submit";
import Documents from "./pages/Documents";
import Department from "./pages/Department";
import Notifications from "./pages/Notifications";
import Archive from "./pages/Archive";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="submit" element={<Submit />} />
            <Route path="documents" element={<Documents />} />
            <Route path="department" element={<Department />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="archive" element={<Archive />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="security" element={<Security />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
