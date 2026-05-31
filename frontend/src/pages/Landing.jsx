import { Link } from 'react-router-dom';
import { 
  FaLeaf, FaCloudSun, FaShoppingCart, FaUsers, 
  FaChartLine, FaMobileAlt, FaCheckCircle, FaMapMarkerAlt,
  FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram 
} from 'react-icons/fa';

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Navigation Bar */}
      <nav style={{ 
        background: '#2c5e2e', 
        padding: '15px 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaLeaf /> Agri-Tech
        </div>
        <div>
          <Link to="/login" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: '10px 25px', 
            border: '2px solid white',
            borderRadius: '5px',
            marginRight: '15px',
            fontWeight: '500'
          }}>
            Login
          </Link>
          <Link to="/register" style={{ 
            background: 'white', 
            color: '#2c5e2e', 
            textDecoration: 'none', 
            padding: '10px 25px', 
            borderRadius: '5px',
            fontWeight: '600'
          }}>
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #2c5e2e 0%, #4a7c4e 100%)',
        color: 'white',
        padding: '80px 5%',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: '700' }}>
          Smart Farming for a Better Tomorrow
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px', opacity: '0.95' }}>
          Empowering farmers with technology-driven solutions for crop management, 
          weather forecasting, and resource optimization.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ 
            background: 'white', 
            color: '#2c5e2e', 
            padding: '15px 40px', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            Get Started
          </Link>
          <a href="#features" style={{ 
            background: 'transparent', 
            color: 'white', 
            padding: '15px 40px', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            fontSize: '18px',
            fontWeight: '600',
            border: '2px solid white'
          }}>
            Learn More
          </a>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" style={{ padding: '80px 5%', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '20px', color: '#2c5e2e' }}>
            About Us
          </h2>
          <p style={{ fontSize: '18px', textAlign: 'center', color: '#666', maxWidth: '900px', margin: '0 auto 50px' }}>
            Bridging the gap between traditional farming and modern technology
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '28px', color: '#2c5e2e', marginBottom: '20px' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
                Agri-Tech is a smart and scalable solution aimed at empowering farmers with 
                cutting-edge technology. We integrate modern tools like weather forecasting, 
                crop tracking, and resource management to streamline farm operations.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
                Designed with user-friendliness and data-driven decisions in mind, our platform 
                helps farmers increase crop yield, reduce loss, and adapt to changing 
                environmental conditions.
              </p>
              <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2c5e2e' }}>1000+</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Farmers Served</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2c5e2e' }}>50+</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Crop Types</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2c5e2e' }}>24/7</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Support</div>
                </div>
              </div>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
              borderRadius: '15px',
              padding: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px'
            }}>
              <FaLeaf style={{ fontSize: '200px', color: '#2c5e2e', opacity: '0.3' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '80px 5%', background: '#f5f7fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '20px', color: '#2c5e2e' }}>
            Key Features
          </h2>
          <p style={{ fontSize: '18px', textAlign: 'center', color: '#666', maxWidth: '900px', margin: '0 auto 50px' }}>
            Everything you need to manage your farm efficiently
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { icon: <FaChartLine />, title: 'Farm Dashboard', desc: 'Centralized dashboard to monitor farm activities, track crop growth, and view historical data' },
              { icon: <FaCloudSun />, title: 'Weather Forecasting', desc: 'Real-time weather updates and forecasts tailored to your farm location' },
              { icon: <FaMapMarkerAlt />, title: 'Field Management', desc: 'Manage multiple farms, track sizes, locations, and primary crop types efficiently' },
              { icon: <FaShoppingCart />, title: 'Resource Marketplace', desc: 'Browse and purchase seeds, fertilizers, and pesticides with order tracking' },
              { icon: <FaLeaf />, title: 'Crop Information', desc: 'Access detailed guides for 12+ crops including planting schedules, soil needs, and care tips' },
              { icon: <FaMobileAlt />, title: 'Responsive Access', desc: 'Seamlessly manage your farm from any device, anywhere, anytime' }
            ].map((feature, idx) => (
              <div key={idx} style={{ 
                background: 'white', 
                padding: '30px', 
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '40px', color: '#2c5e2e', marginBottom: '15px' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '20px', color: '#2c5e2e', marginBottom: '10px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '80px 5%', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '20px', color: '#2c5e2e' }}>
            Our Services
          </h2>
          <p style={{ fontSize: '18px', textAlign: 'center', color: '#666', maxWidth: '900px', margin: '0 auto 50px' }}>
            Comprehensive solutions for modern farming
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #2c5e2e 0%, #4a7c4e 100%)',
              color: 'white',
              padding: '40px',
              borderRadius: '10px'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>📊 Data Analytics & Reports</h3>
              <p style={{ lineHeight: '1.8', opacity: '0.95' }}>
                Generate detailed reports on farm performance, resource usage, and crop yields. 
                Make data-driven decisions with our powerful analytics tools.
              </p>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
              color: 'white',
              padding: '40px',
              borderRadius: '10px'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>🌾 Crop Information Database</h3>
              <p style={{ lineHeight: '1.8', opacity: '0.95' }}>
                Access detailed information about different crops including planting guides, 
                care instructions, and pest management tips.
              </p>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
              color: 'white',
              padding: '40px',
              borderRadius: '10px'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>🛒 Integrated Marketplace</h3>
              <p style={{ lineHeight: '1.8', opacity: '0.95' }}>
                Buy agricultural resources such as seeds, fertilizers, and pesticides directly 
                through the app with secure payment and delivery tracking.
              </p>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
              color: 'white',
              padding: '40px',
              borderRadius: '10px'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>👥 Role-Based Access</h3>
              <p style={{ lineHeight: '1.8', opacity: '0.95' }}>
                Dedicated interfaces for Farmers and Admins to streamline workflows, 
                manage inventory, and oversee system operations.
              </p>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)',
              color: 'white',
              padding: '40px',
              borderRadius: '10px'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>🔒 Secure & Private</h3>
              <p style={{ lineHeight: '1.8', opacity: '0.95' }}>
                Your data is protected with enterprise-grade security and JWT authentication. 
                Role-based access ensures safe usage and data protection.
              </p>
            </div>

            {/* ✅ NEW 6TH CARD */}
            <div style={{ 
              background: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)',
              color: 'white',
              padding: '40px',
              borderRadius: '10px'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>🌤️ Weather Forecasting</h3>
              <p style={{ lineHeight: '1.8', opacity: '0.95' }}>
                Get real-time weather updates and location-specific forecasts to plan irrigation, 
                protect crops from adverse conditions, and optimize daily farming schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" style={{ padding: '80px 5%', background: '#f5f7fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '20px', color: '#2c5e2e' }}>
            Contact Us
          </h2>
          <p style={{ fontSize: '18px', textAlign: 'center', color: '#666', marginBottom: '50px' }}>
            Have questions? We're here to help!
          </p>

          <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gap: '25px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <FaEnvelope style={{ fontSize: '24px', color: '#2c5e2e' }} />
                <div>
                  <strong style={{ color: '#2c5e2e', display: 'block', marginBottom: '5px' }}>Email</strong>
                  <span style={{ color: '#666' }}>support@agritech.com</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <FaPhone style={{ fontSize: '24px', color: '#2c5e2e' }} />
                <div>
                  <strong style={{ color: '#2c5e2e', display: 'block', marginBottom: '5px' }}>Phone</strong>
                  <span style={{ color: '#666' }}>+1 (555) 123-4567</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <FaMapMarkerAlt style={{ fontSize: '24px', color: '#2c5e2e' }} />
                <div>
                  <strong style={{ color: '#2c5e2e', display: 'block', marginBottom: '5px' }}>Address</strong>
                  <span style={{ color: '#666' }}>123 Agriculture Street, Farm City, FC 12345</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '30px' }}>
              <h3 style={{ color: '#2c5e2e', marginBottom: '20px', fontSize: '20px' }}>Send us a Message</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                For support inquiries, feature requests, or general questions, please reach out to us. 
                Our team typically responds within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <a href="#" style={{ color: '#2c5e2e', fontSize: '28px', transition: 'color 0.3s' }} 
                   onMouseEnter={(e) => e.target.style.color = '#4a7c4e'}
                   onMouseLeave={(e) => e.target.style.color = '#2c5e2e'}>
                  <FaFacebook />
                </a>
                <a href="#" style={{ color: '#2c5e2e', fontSize: '28px', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => e.target.style.color = '#4a7c4e'}
                   onMouseLeave={(e) => e.target.style.color = '#2c5e2e'}>
                  <FaTwitter />
                </a>
                <a href="#" style={{ color: '#2c5e2e', fontSize: '28px', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => e.target.style.color = '#4a7c4e'}
                   onMouseLeave={(e) => e.target.style.color = '#2c5e2e'}>
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: '#2c5e2e', 
        color: 'white', 
        padding: '30px 5%', 
        textAlign: 'center'
      }}>
        <p style={{ marginBottom: '10px', fontSize: '16px' }}>
          © 2026 Agri-Tech. All rights reserved.
        </p>
        <p style={{ opacity: '0.8', fontSize: '14px' }}>
          Empowering farmers with technology for a sustainable future.
        </p>
      </footer>
    </div>
  );
}