import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import {
  FileSignature,
  Menu,
  X,
  Home,
  FileText,
  History,
  Settings,
  Users,
  Bell,
  Search,
} from "lucide-react";

// Import pages
import HomePage from "./pages/Homepage";
import LogExpense from "./pages/test";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import UploadDocuments from "./pages/UploadDocuments";

import ForgotPasswordPage from "./pages/ForgotPassword";
import TokenVerification from "./pages/TokenVerificationPage";
import ResetPassword from "./pages/ResetPasswordPage";
import CreateAgreement from "./pages/CreateAgreement";
import AgreementForm from "./pages/CreateAgreement";

// import Documents from '.';
// import History from './pages/History';
// import Team from './pages/Team';
// import Settings from './pages/Settings';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

const Sidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  background: white;
  border-right: 1px solid #e2e8f0;
  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease;
  z-index: 50;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  span {
    font-size: 1.25rem;
    font-weight: bold;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CloseButton = styled.button`
  @media (min-width: 1024px) {
    display: none;
  }

  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #1e293b;
  }
`;

const Nav = styled.nav`
  padding: 1.5rem;
`;

const NavSection = styled.div`
  margin-bottom: 2rem;

  h2 {
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
    padding-left: 1rem;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${(props) => (props.$active ? "#2563eb" : "#64748b")};
  background: ${(props) => (props.$active ? "#eff6ff" : "transparent")};
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background: ${(props) => (props.$active ? "#eff6ff" : "#f8fafc")};
    color: ${(props) => (props.$active ? "#2563eb" : "#1e293b")};
  }
`;

const MainContent = styled.main`
  padding-left: ${(props) =>
    props.isSidebarOpen && props.noSidebarPadding !== true ? "280px" : "0"};
  transition: padding-left 0.3s ease;

  @media (max-width: 1024px) {
    padding-left: 0;
  }
`;

const TopBar = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 40;
`;

const MenuButton = styled.button`
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }

  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #1e293b;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 400px;
  margin: 0 1rem;

  input {
    border: none;
    background: none;
    outline: none;
    width: 100%;
    color: #1e293b;

    &::placeholder {
      color: #94a3b8;
    }
  }
`;

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;

  &:hover {
    color: #1e293b;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: #ef4444;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid white;
`;

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location]);
  const publicRoutes = [ "/", "/sign-up", "/sign-in", '/forgot-password', '/token/:email', '/reset-password/:email'];
  return (
    <Container>
      {!publicRoutes.includes(location.pathname) && (
        <Overlay
          isOpen={isSidebarOpen}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {!publicRoutes.includes(location.pathname) && (
        <Sidebar isOpen={isSidebarOpen}>
          <SidebarHeader>
            <Logo to="/">
              <FileSignature size={28} color="#2563eb" />
              <span>DocSign</span>
            </Logo>
            <CloseButton onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </CloseButton>
          </SidebarHeader>

          <Nav>
            <NavSection>
              <h2>MAIN MENU</h2>
              <NavItem
                to="/upload-document"
                $active={location.pathname === "/upload-document"}
              >
                <Home size={20} />
                Upload Document
              </NavItem>
              <NavItem
                to="/create-agreement"
                $active={location.pathname === "/create-agreement"}
              >
                <FileText size={20} />
                Create Agreement
              </NavItem>
              <NavItem to="/history" $active={location.pathname === "/history"}>
                <History size={20} />
                History
              </NavItem>
            </NavSection>

            <NavSection>
              <h2>SETTINGS</h2>
              <NavItem to="/team" $active={location.pathname === "/team"}>
                <Users size={20} />
                Team
              </NavItem>
              <NavItem
                to="/settings"
                $active={location.pathname === "/settings"}
              >
                <Settings size={20} />
                Settings
              </NavItem>
            </NavSection>
          </Nav>
        </Sidebar>
      )}

      <MainContent
        isSidebarOpen={isSidebarOpen}
        noSidebarPadding={
          location.pathname === "/sign-in" ||
          location.pathname === "/" ||
          location.pathname === "/sign-up" ||
          location.pathname === "/forgot-password" ||
          location.pathname === "/token/:email" ||
          location.pathname === "/reset-password/:email"
        }
      >
        {!publicRoutes.includes(location.pathname) && (
          <TopBar>
            <MenuButton onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </MenuButton>

            <SearchBar>
              <Search size={20} color="#94a3b8" />
              <input placeholder="Search documents..." />
            </SearchBar>

            <TopBarActions>
              <IconButton>
                <Bell size={20} />
                <NotificationBadge />
              </IconButton>
            </TopBarActions>
          </TopBar>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload-document" element={<UploadDocuments />} />

          <Route path="/create-agreement" element={<AgreementForm />} />

          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
          <Route path="/token/:email" element={<TokenVerification />} />
          <Route path="/reset-password/:email" element={<ResetPassword />} />


          <Route path="/test" element={<LogExpense />} />
          {/* Other routes */}
        </Routes>
      </MainContent>
    </Container>
  );
}

function App() {
  return <AppContent />;
}

export default App;