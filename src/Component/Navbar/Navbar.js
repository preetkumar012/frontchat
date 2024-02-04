import React from 'react'
import "./Navbar.css";
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user')
  const LogoutHandler = () => {
    if (auth) {
      localStorage.clear('user')
      navigate('/');
    }

  }
  return (
    <>
      <nav>

        <input type="checkbox" id="check" />
        <label for="check" class="checkbtn">
          <i class="fas fa-bars"></i>
        </label>

        <label class="logo"> CHAT APPLICATION</label>
        {
          auth ?

            <ul>

              <li><NavLink to="/" onClick={LogoutHandler}>Logout</NavLink></li>
            </ul>
            : <>
              <ul>
                <li><NavLink to="/">Login</NavLink></li>
              </ul>
            </>
        }

      </nav>

    </>
  )
}

export default Navbar