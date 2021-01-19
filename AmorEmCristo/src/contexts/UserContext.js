import React from 'react';

const UserContext = React.createContext({
  user: null,
  updateUser: (data) => {},
});

export default UserContext;
