/**
 * Contract every video provider must implement. The rest of the app only talks to
 * this interface (through getVideoProvider()), so switching vendors means writing one
 * new file in ./providers and changing VIDEO_PROVIDER.
 */
export class VideoProvider {
  /**
   * Create a private room for one booking.
   * @param {{ bookingId: string, startAt: Date, endAt: Date }} input
   * @returns {Promise<{ provider: string, roomId: string, roomUrl: string }>}
   */
  async createRoom(input) {
    throw new Error(`${this.constructor.name}.createRoom is not implemented`);
  }

  /**
   * Issue a short-lived token that lets one participant join a room.
   * @param {{ roomId: string, userId: string, displayName: string, isPartner: boolean, expiresAt: Date }} input
   * @returns {Promise<{ token: string, roomUrl: string }>}
   */
  async createJoinToken(input) {
    throw new Error(`${this.constructor.name}.createJoinToken is not implemented`);
  }

  /**
   * Remove a room once its session is over or cancelled.
   * @param {string} roomId
   * @returns {Promise<void>}
   */
  async deleteRoom(roomId) {
    throw new Error(`${this.constructor.name}.deleteRoom is not implemented`);
  }
}
