const users = {
  'pradyumanvig@hotmail.com': {
    name: {
      first: 'Pradyuman',
      last: 'Vig'
    }
  },
  'me@ian.pw': {
    name: {
      first: 'Ian',
      last: 'Macalinao'
    }
  },
  'dylanmacalinao@gmail.com': {
    name: {
      first: 'Dylan',
      last: 'Macalinao'
    }
  },
};

export function voiceHandler(req, res) {

  const { uid, query } = req.body;

  let user = users[uid];
  if (!user) {
    user = users[uid] = {};
  }

  let message = `Hello, ${user.name.first}. What are you looking for?`;
  res.json({ message });
};
