export default function FormUser({ formData, editing, handleChange, handleEdit, handleCancel, handleSave }) {
  return (
    <form className="profile-form" onSubmit={handleSave} noValidate>
      <label>
        Nombre de usuario:
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          disabled={!editing}
        />
      </label>
      <label>
        Correo electrónico:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editing}
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={!editing}
        />
      </label>
      <div className="profile-buttons">
        {!editing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="user-button primary"
          >
            Modificar
          </button>
        ) : (
          <>
            <button type="submit" className="user-button primary">
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="user-button"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </form>
  );
}