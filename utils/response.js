const statusType = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict Resources",
  500: "Internal Server Error",


};

class ApplicationError extends Error {
  constructor(status, message = null) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.status = status;
    this.message = message || statusType[status];
  }
}

class InternalServerError extends ApplicationError {
  constructor() {
    super(500);
  }
}

class NotAuthenticated extends ApplicationError {
  constructor() {
    super(401);
  }
}

class NotFound extends ApplicationError {
  constructor() {
    super(404);
  }
}

class Forbidden extends ApplicationError {
  constructor() {
    super(403);
  }
}

class UserAlreadyExists extends ApplicationError {
  constructor() {
    super(403, "User already exists");
  }
}

class KelasAlreadyExists extends ApplicationError {
  constructor() {
    super(403, "Class already exists");
  }
}

class UserAlreadyInClas extends ApplicationError {
  constructor() {
    super(403, "User already in Class");
  }
}

const SuccessFetchResponse = (res, data) => {
  return res.status(200).json({
    success: true,
    data: data,
  });
};

module.exports = {
  Forbidden,
  InternalServerError,
  NotAuthenticated,
  NotFound,
  UserAlreadyExists,
  KelasAlreadyExists,
  UserAlreadyInClas,
  SuccessFetchResponse,
};
