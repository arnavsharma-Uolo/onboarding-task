import { controllerWrapper } from '../lib/controllerWrapper';
import build_response from '../lib/response/MessageResponse';

// POST /api/health
export const healthCheck = controllerWrapper(async (_req, res) => {
  res.status(200).json(build_response(true, 'API is up and running!', null, null, null));
});
