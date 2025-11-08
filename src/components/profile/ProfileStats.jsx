export default function ProfileStats({ user }) {
  return (
    <section className="profile-stats">
      <h3>Mis listas</h3>
      <p>Favoritos: {user?.favorites?.length || 0}</p>
      <p>Leídos: {user?.read?.length || 0}</p>
      <p>Lo tengo: {user?.owned?.length || 0}</p>
      <p>Lo quiero: {user?.wishlist?.length || 0}</p>
      <p>Mis cómics creados: {user?.createdComics?.length || 0}</p>
    </section>
  );
}