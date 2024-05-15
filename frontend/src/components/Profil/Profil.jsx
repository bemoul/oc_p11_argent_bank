function Profil({ name }) {
  return (
    <div className="main-nav-item">
      <i className="fa fa-user-circle"></i>
      <span className="profil_name">{name}</span>
    </div>
  );
}

export default Profil;
