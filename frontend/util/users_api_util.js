export const fetchUsers = () => (
  $.ajax({
    method: "GET",
    url: "api/users"
  })
);

export const updateUser = user => (
  $.ajax({
    method: "PATCH",
    url: `api/users/${user.id}`,
    data: { user }
  })
);

export const updateUserAvatar = (id, formData) => (
  $.ajax({
    method: "PATCH",
    url: `api/users/${id}`,
    contentType: false,
    processData: false,
    data: formData
  })
);
