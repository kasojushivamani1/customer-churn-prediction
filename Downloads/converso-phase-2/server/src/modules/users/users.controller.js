export function getMe(req, res) {
  res.json({ user: req.user });
}

export async function updateMe(req, res) {
  Object.assign(req.user, req.body);
  await req.user.save();
  res.json({ user: req.user });
}

export async function addRole(req, res) {
  const { role } = req.body;

  if (!req.user.roles.includes(role)) {
    req.user.roles.push(role);
    await req.user.save();
  }

  res.json({ user: req.user });
}
