const users = {
  'pradyumanvig@outlook.com': {
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

const active = {
  user: 'pradyumanvig@outlook.com'
};

export function voiceHandler(req, res) {

  let { uid, query, reset } = req.query;
  query = query.toLowerCase();

  let user = users[uid];
  if (!user) {
    user = users[uid] = {};
  }

  let session;
  if (reset === "true") {
    session = user.session = {
      initial: true
    };
    let asdf = { message: `Hello, ${user.name.first}. What are you looking for?` };
    session.lol = asdf;
    return res.end(asdf.message);
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

    session.lol = ret;
    return res.end(ret.message);
  }


  let lol = session.lol;
  let outfit = lol.outfit;
  if (/different shirt/.test(query)) {
    outfit[0] = Math.floor(Math.random() * 5) + 1;
    lol.message = "I found you a new shirt.";
  } else if (/different shorts/.test(query)) {
    outfit[1] = Math.floor(Math.random() * 5) + 1;
    lol.message = "I found you some new shorts.";
  } else if (/different pants/.test(query)) {
    outfit[1] = Math.floor(Math.random() * 5) + 1;
    lol.message = "I found you some new pants.";
  } else if (/different shoes/.test(query)) {
    outfit[2] = Math.floor(Math.random() * 5) + 1;
    lol.message = "I found you some new shoes. Hope you like them!";
  } else if (/thanks/.test(query)) {
    lol.message = rand(
      `Anytime, ${user.name.nick}.`,
      `Sure thing, ${user.name.nick}.`
    );
  } else if (/fuck|shit/.test(query)) {
    lol.message = "That's not very nice.";
  } else if (/(pick again|new outfit)/.test(query)) {
    lol.outfit = nextOutfit();
    lol.message = "I created a new outfit for you. How do you like it?";
  } else {
    lol.message = "I didn't understand that.";
  }
  res.end(lol.message);
};

function rand(...picks) {
  return picks[Math.floor(Math.random() * picks.length)];
}

function nextOutfit() {
  return [0, 0, 0].map(() => Math.floor(Math.random() * 5) + 1);
}

export function fetchLol(req, res) {
  let user = users[active.user];
  let lol = (user.session || {}).lol;
  res.json(lol);
}
