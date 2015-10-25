const users = {
  'pradyumanvig@hotmail.com': {
    name: {
      first: 'Pradyuman',
      last: 'Vig',
      nick: 'Prad'
    }
  },
  'me@ian.pw': {
    name: {
      first: 'Ian',
      last: 'Macalinao',
      nick: 'Ian'
    }
  },
  'dylanmacalinao@gmail.com': {
    name: {
      first: 'Dylan',
      last: 'Macalinao',
      nick: 'Dylan'
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
    session = user.session = {
      initial: true
    };
    res.json({ message: `Hello, ${user.name.first}. What are you looking for?` });
  } else {
    session = user.session;
    if (!session) {
      session = user.session = {
        initial: true
      };
    }
  }

  if (session.initial) {
    delete session.initial;
    let outfit = nextOutfit();
    let ret = { outfit };

    if (/cool|cold/.test(query)) {
      ret.cool = true;
      ret.message = "Here are some cool weather clothes for you.";
    } else if (/warm|hot/.test(query)) {
      ret.cool = false;
      ret.message = "Here are some warm weather clothes for you.";
    } else {
      ret.message = rand(
        `I think you'd like these clothes, ${user.name.nick}!`,
        `${user.name.nick}, I've picked out these clothes for you.`,
        `Take a look at these clothes, ${user.name.nick}!`
      );
    }

    res.json(ret);
  }

  let message = 'lol';
  res.json({ message });
};

function rand(...picks) {
  return picks[Math.floor(Math.random() * picks.length)];
}

function nextOutfit() {
  return [0, 0, 0].map(() => Math.floor(Math.random() * 5) + 1);
}
