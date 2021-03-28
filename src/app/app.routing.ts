import express from "express";
const router = express.Router();

router.post("/test", express.json(), (req, res, next) => {
  console.log(JSON.stringify(req.body));
  res.send(JSON.stringify(req.body));
});

router.get("/error", (req, res, next) => {
  next("error page.");
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
