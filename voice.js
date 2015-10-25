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

  const { uid, query, reset } = req.body;

  let user = users[uid];
  if (!user) {
    user = users[uid] = {};
  }

  let session;
  if (reset) {
    session = user.session = {};
    res.json({ message: `Hello, ${user.name.first}. What are you looking for?` });
  } else {
    session = user.session;
  }

  let message = 'lol';
  res.json({ message });
};
