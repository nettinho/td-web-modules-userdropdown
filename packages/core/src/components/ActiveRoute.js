export const ActiveRoute = (location, route) => {
  return (
    (location && location.pathname === route) ||
    location.pathname.startsWith(`${route}/`)
  );
};

export default ActiveRoute;
