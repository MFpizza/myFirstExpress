import express from "express";
const router = express.Router();
import mongoose from 'mongoose';
import { UserModel } from "../models/user";

router.post("/test", express.json(), (req, res, next) => {
  console.log(JSON.stringify(req.body));
  res.send(JSON.stringify(req.body));
});

router.get("/error", (req, res, next) => {
  next("error page.");
});

//TODO CRUD
//* C: Create 
router.post('/user/create', express.json(), (req, res, next) => {
  const { username, email } = req.body;
  const user = new UserModel({ username, email });
  const data = user.save();
  res.send(data);
});

//* R: Read
router.get('/users/read', (req, res, next) => {
  //find 也可以用
  const documents = UserModel.findOne({ username: req.query.username });
  res.send(documents);
});

//* U: Update
//! 只會更新 不會取得更新後的值
router.patch('/users/:id', express.json(),(req, res, next) => {
  UserModel.updateOne({ _id: req.params.id }, { username: req.body.username }, { runValidators: true });
  res.send('成功');
});

//! 會回傳更新後的值
// router.patch('/users/:id', express.json(), (req, res, next) => {
//   const options: FindOneAndUpdateOptions = {
//     new: true,
//     runValidators: true
//   };
//   const document = UserModel.findByIdAndUpdate(req.params.id, { username: req.body.username }, options);
//   res.send(document);
// });

//* D: delete
router.delete('/users/:id', (req, res, next) => {
  UserModel.findByIdAndRemove(req.params.id);
  res.send('刪除成功');
});

router.get("/data/error", (req, res, next) => {
  // Fake API
  const getProfile = new Promise((resolve, reject) => {
    setTimeout(() => resolve({ name: "HAO", age: 22 }), 100);
  });
  const getFriends = new Promise((resolve, reject) => {
    setTimeout(() => resolve([]), 120);
  });
  const errorRequest = new Promise((resolve, reject) => {
    setTimeout(() => reject("Oops!"), 2000);
  });

  getProfile
    .then((profile) => getFriends)
    .then((friends) => errorRequest)
    .then(() => res.send("GoGoGo!"))
    .catch((err) => next(err));
});

// const errorHandler = (
//   func: (req: Request, res: Response, next: NextFunction) => Promise<void>
// ) => (req: Request, res: Response, next: NextFunction) =>
//   func(req, res, next).catch(next);

// router.get(
//   "/data/error/promise",
//   errorHandler(async (req, res, next) => {
//     // Fake API
//     const getProfile = new Promise((resolve, reject) => {
//       setTimeout(() => resolve({ name: "HAO", age: 22 }), 100);
//     });
//     const getFriends = new Promise((resolve, reject) => {
//       setTimeout(() => resolve([]), 120);
//     });
//     const errorRequest = new Promise((resolve, reject) => {
//       setTimeout(() => reject("Oops!"), 2000);
//     });

//     const profile = await getProfile;
//     const friends = await getFriends;
//     const none = await errorRequest;
//     res.send("GoGoGo!");
//   })
// );

export default router;