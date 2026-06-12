import BadRequestError from "../error/badRequest.error.js";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = {};

      // Iterate through the Zod issues to format them cleanly
      result.error.issues.forEach((issue) => {
        // issue.path is an array, e.g., ['body', 'password'] or ['query', 'limit']
        // Slice(1) removes the root level ('body' / 'query') so the client gets 'password'
        const fieldName = issue.path.slice(1).join(".") || issue.path[0];
        errors[fieldName] = issue.message;
      });
      throw new BadRequestError("Validation failed", errors);
    }

    req.validated = result.data;
    next();
  };
};

export default validateRequest;
