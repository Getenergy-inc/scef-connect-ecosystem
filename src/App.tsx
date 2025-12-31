import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
import LocalChapters from "./pages/LocalChapters";
import Media from "./pages/Media";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import Wallet from "./pages/Wallet";
import GetInvolved from "./pages/GetInvolved";
import Membership from "./pages/Membership";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/local-chapters" element={<LocalChapters />} />
            <Route path="/media" element={<Media />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
