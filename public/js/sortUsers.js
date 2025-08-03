export function sortUsersByLastLogin(users, ascending = false) {
  return users.slice().sort((a, b) => {
    const dateA = new Date(a.last_login || 0);
    const dateB = new Date(b.last_login || 0);
    return ascending ? dateA - dateB : dateB - dateA;
  });
}
