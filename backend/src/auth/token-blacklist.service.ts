import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenBlacklistService {
  private blacklistedTokens = new Set<string>();

  addToBlacklist(token: string): void {
    this.blacklistedTokens.add(token);
  }

  isBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  // Optional: Clean up expired tokens periodically
  clearExpiredTokens(): void {
    // In a production environment, you would decode JWT tokens
    // and remove only those that have expired
    // For now, this is a placeholder for cleanup logic
  }
}
