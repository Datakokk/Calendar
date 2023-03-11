import { useAuthStore } from "../../hooks"

import { Offline, Online } from "react-detect-offline";


export const Navbar = () => {

  const {startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.name }
        </span>

        <Online>
          <span className="text-success">Online</span>
        </Online>
        <Offline>
          <span className="text-danger">Offline - Requests will be stored</span>
        </Offline>
        <button 
          onClick={ startLogout }
          className="btn btn-outline-danger">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logg ut</span>
        </button>
    </div>
  )
}
