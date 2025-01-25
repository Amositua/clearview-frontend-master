import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Effortless Document Management",
      description: "Streamline your business processes with secure uploads, electronic signatures, and easy meeting scheduling.",
    },
    {
      title: "Secure and Reliable",
      description: "Keep your business documents safe and accessible with top-notch security features.",
    },
    {
      title: "Collaborate with Ease",
      description: "Work seamlessly with your team and clients in one platform.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Container>
      <Header>
        <Logo>DocuPro</Logo>
        <ButtonGroup>
            <Link to="/sign-in">
          <Button>Sign In</Button>
          </Link>
          <Link to="/sign-up">
          <Button primary>Sign Up</Button>
          </Link>
        </ButtonGroup>
      </Header>
      <MainContent>
        <Slideshow>
          <Slide>
            <Tagline>{slides[currentSlide].title}</Tagline>
            <Description>{slides[currentSlide].description}</Description>
          </Slide>
        </Slideshow>
        <FeatureSection>
          <Feature>
            <FeatureTitle>Secure Document Uploads</FeatureTitle>
            <FeatureDescription>
              Upload and manage all your business documents in one secure platform.
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureTitle>Electronic Signatures</FeatureTitle>
            <FeatureDescription>
              Sign documents digitally with legally binding e-signatures.
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureTitle>Integrated Scheduling</FeatureTitle>
            <FeatureDescription>
              Schedule and manage meetings seamlessly with our built-in calendar.
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureTitle>Team Collaboration</FeatureTitle>
            <FeatureDescription>
            Collaborate effectively with your team using shared workspaces and real-time updates.
            </FeatureDescription>
          </Feature>
        </FeatureSection>
        <GetStartedButton>Get Started</GetStartedButton>
      </MainContent>
      <Footer>
        <FooterText>
          © {new Date().getFullYear()} DocuPro. All rights reserved. | Privacy Policy | Terms of Service
        </FooterText>
      </Footer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, #f0f4f8, #d9e2ec);
  color: #333;
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.header`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #007BFF;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ primary }) => (primary ? "#fff" : "#007BFF")};
  background: ${({ primary }) => (primary ? "#007BFF" : "#fff")};
  border: 2px solid #007BFF;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: ${({ primary }) => (primary ? "#0056b3" : "#f0f4f8")};
    color: ${({ primary }) => (primary ? "#fff" : "#0056b3")};
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const Slideshow = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;
  overflow: hidden;
  text-align: center;
`;

const Slide = styled.div`
  animation: fade 1.5s ease-in-out;
  @keyframes fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Tagline = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #555;
  line-height: 1.6;
`;

const FeatureSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
  width: 100%;
  max-width: 900px;
`;

const Feature = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #007BFF;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
`;

const GetStartedButton = styled(Button)`
  background: #28a745;
  color: #fff;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #218838;
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 20px;
  text-align: center;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #777;
`;

export default HomePage;
