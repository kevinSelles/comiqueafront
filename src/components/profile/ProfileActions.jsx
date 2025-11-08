export default function ProfileActions({ handleLogout, handleDeleteAccount }) {
  return (
    <div className="profile-actions">
      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
      <button
        onClick={handleDeleteAccount}
        className="delete-account-button"
      >
        Eliminar cuenta
      </button>
    </div>
  );
}