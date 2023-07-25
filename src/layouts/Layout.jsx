import { NavLink } from "react-router-dom";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Layout = (props) => {
  let menu = 
  <ul className="navbar-nav">
  <li className="nav-item">
    <NavLink to="/" className="nav-link active">
      Home
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink to="/income/" className="nav-link">
      Income
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink to="/expences/" className="nav-link">
      Expences
    </NavLink>
  </li>
</ul>
  
  return (
    <>
      
      <nav className="navbar navbar-expand-sm header navbar-dark">
        <div className="container-fluid">
        
          <a href=""><NavLink to="/" className="">
          <h5 className="h1 text-white">Ost<span className="color">...</span></h5>
        </NavLink></a>
          {menu}
        </div>
      </nav>

      <div className="container mt-5">{props.children}</div>

       <footer className="w-100 py-4 flex-shrink-0">
        <div className="container py-4">
          <div className="row gy-4 gx-5">
          <div class="col-lg-4 col-md-6">
                    <h5 className="h1 text-white">Ost<span className="color">...</span></h5>
                    <p className="small text-white">This is one place where a Legal personnel, a Company Secretary, an Accountant and a Human Resource professional feels at Home. We make life easier by Automating storage and alerts before Important dates. Be it compliance risks, contract renewals or litigation hearing. We keep you covered.</p>
                    <p className="small text-white mb-0">&copy; 2023 Copyrights. All rights reserved. <a class="color" href="#">Ost.com</a></p>
                </div>
            <div class="col-lg-2 col-md-6">
                    <h5 className="text-white mb-3">Quick links</h5>
                    <ul className="list-unstyled text-white">
                      {menu}
                    </ul>
                </div>

                <div className="col-lg-2 col-md-6">
                    <h5 className="text-white mb-3">Quick links</h5>
                    <ul className="list-unstyled text-white">
                        {menu}
                    </ul>
                </div>
                <div className="col-lg-4 col-md-6">
                    <h5 className="text-white mb-3">Newsletter</h5>
                    <p className="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                    <form >
                        <div class="input-group mb-3">
                            <input type="text"  className="form-control"/>
                            <button class="btn btn-primary" type="button"><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </div>
                    </form>
                </div>
          </div>
        </div>

       </footer>
    </>
  );
};

export default Layout;
