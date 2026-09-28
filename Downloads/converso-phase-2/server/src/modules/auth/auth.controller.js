import { User } from '../../models/User.js';

export async function syncUser(req, res) {
  const { uid, email, name, picture } = req.authUser;

  const user = await User.findOneAndUpdate(
    { firebaseUid: uid },
    {
      // Email and photo can change on Firebase's side (e.g. a new Google avatar), so
      // they're kept in sync on every call. Name and roles are only set on first sight,
      // so they don't overwrite anything the person has since customized in Converso.
      $set: { email: email ?? '', photoUrl: picture ?? '' },
      $setOnInsert: { firebaseUid: uid, name: name ?? '', roles: [] },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  res.status(200).json({ user });
}
