// Augments Express's Request type so req.user is available in all handlers
// after the authMiddleware has run.
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export {};
