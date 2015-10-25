const users = {};

export function voiceHandler(req, res) {

  const { uid, query } = req.body;

  let user = users[uid];
  if (!user) {
    user = users[uid] = {};
  }

  let message = "Nice to see you again, Pradyuman.";
  res.json({ message });
};
