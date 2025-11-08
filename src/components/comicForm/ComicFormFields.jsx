export default function ComicFormFields({
  register,
  errors,
  setValue,
  imagePreview,
  setImagePreview,
}) {
  return (
    <>
      <label>
        Título *
        <input type="text" {...register("title", { required: "El título es obligatorio" })} />
        {errors.title && <span className="error-message">{errors.title.message}</span>}
      </label>
      <label>
        Descripción *
        <textarea {...register("description", { required: "La descripción es obligatoria" })} />
        {errors.description && <span className="error-message">{errors.description.message}</span>}
      </label>
      <label>
        Autor/es * (separar por comas)
        <input type="text" {...register("authors", { required: "El autor es obligatorio" })} />
        {errors.authors && <span className="error-message">{errors.authors.message}</span>}
      </label>
      <label>
        ISBN *
        <input
          type="text"
          {...register("isbn", {
            required: "El ISBN es obligatorio",
            pattern: {
              value: /^[0-9]{10,13}$/,
              message: "Debe tener 10 o 13 dígitos sin espacios ni guiones",
            },
          })}
        />
        {errors.isbn && <span className="error-message">{errors.isbn.message}</span>}
      </label>
      <label>
        Fecha de publicación
        <input type="text" {...register("date")} />
      </label>
      <label>
        Colección
        <input type="text" {...register("serie")} />
      </label>
      <label>
        Editorial
        <input type="text" {...register("publisher")} />
      </label>
      <label>
        Idioma
        <input type="text" {...register("language")} />
      </label>
      <label>
        Formato
        <input type="text" {...register("format")} />
      </label>
      <label>
        Portada
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files[0]) {
              setValue("img", e.target.files);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
      </label>
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Previsualización" />
        </div>
      )}
    </>
  );
}