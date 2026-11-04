export interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly retryAfterMs: number;
}

export interface RateLimitPolicy {
  readonly actionId: string;
  readonly maxRequests: number;
  readonly windowMs: number;
}

/**
 * Sliding-window client-side rate limiter to prevent automated form spam and UI abuse.
 */
class SlidingWindowRateLimiter {
  private readonly buckets = new Map<string, number[]>();

  public checkAndRecord(policy: RateLimitPolicy, now: number = Date.now()): RateLimitResult {
    const { actionId, maxRequests, windowMs } = policy;
    const windowStart = now - windowMs;

    const existingTimestamps = this.buckets.get(actionId) ?? [];
    const activeTimestamps = existingTimestamps.filter((ts) => ts > windowStart);

    if (activeTimestamps.length >= maxRequests) {
      const oldestInWindow = activeTimestamps[0] ?? now;
      const retryAfterMs = Math.max(0, oldestInWindow + windowMs - now);
      this.buckets.set(actionId, activeTimestamps);
      return {
        allowed: false,
        remaining: 0,
        retryAfterMs,
      };
    }

    activeTimestamps.push(now);
    this.buckets.set(actionId, activeTimestamps);

    return {
      allowed: true,
      remaining: Math.max(0, maxRequests - activeTimestamps.length),
      retryAfterMs: 0,
    };
  }

  public reset(actionId?: string): void {
    if (actionId) {
      this.buckets.delete(actionId);
    } else {
      this.buckets.clear();
    }
  }
}

export const rateLimiter = new SlidingWindowRateLimiter();

