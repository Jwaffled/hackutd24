const Header: React.FC = () => {

  return ( 
    <header className="header">
        <div className="nav-button" onClick={() => handleNavigation("Homepage")}>
          <i className="fas fa-home icon"></i>
          <span>Logo (Homepage)</span>
        </div>
        <div className="nav-button" onClick={() => handleNavigation("Compare Cars")}>
          <i className="fas fa-balance-scale icon"></i>
          <span>Compare Cars</span>
        </div>
        <div className="nav-button" onClick={() => handleNavigation("Search")}>
          <i className="fas fa-search icon"></i>
          <span>Search</span>
        </div>
        <div className="nav-button" onClick={() => handleNavigation("Contact")}>
          <i className="fas fa-phone icon"></i>
          <span>Contact</span>
        </div>
      </header>
  );
}

export default Header