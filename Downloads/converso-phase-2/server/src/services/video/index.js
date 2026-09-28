import { env } from '../../config/env.js';
import { DailyProvider } from './providers/daily.provider.js';

// Register new providers here.
const registry = {
  daily: () => new DailyProvider(),
};

let instance;

export function getVideoProvider() {
  if (!instance) {
    const create = registry[env.VIDEO_PROVIDER];
    if (!create) {
      throw new Error(
        `Unknown VIDEO_PROVIDER "${env.VIDEO_PROVIDER}". Available: ${Object.keys(registry).join(', ')}`,
      );
    }
    instance = create();
  }
  return instance;
}
