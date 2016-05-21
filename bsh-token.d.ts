/**
 * Created by Franz on 4/30/2016.
 */

declare module 'bsh-token' {
  import Promise = Q.Promise;

  /**
   * Provide the database implementation.  See bsh-mongo-token for code documentation on required API
   * @param implementation The implementation module.  Could be "requires('bsh-mongo-token')"
   */
  export function implementation(implementation:any);
  /**
   * Set the default session timeout in milliseconds.  If this is never called, it is one hour
   * @param timeout
   */
  export function setSessionTimeout(timeout:number);
  /**
   * Set the default final timeout in milliseconds.  If this is never called, it is one hundred years.
   * @param timeout
   */
  export function setFinalTimeout(timeout:number);
  /**
   * If frequency is not provided, returns truthy if the cleanup was started false otherwise.  The truthy value is the frequency it was started with.
   * If frequency is provided start the token cleanup sequence after and every frequency millis.  If it was already started, it will stop and restart.
   * @param frequency in milliseconds
   * @return false if not started, the frequency if started.
   */
  export function cleanup(frequency:number) : boolean;
  /**
   * Stop the token cleanup sequence
   */
  export function stopCleanup();
  /**
   *
   * @param context Defines the context for which the token is being created
   * @param user A user handle, such as an id.
   * @param roles An array of role names that are allowed by this token
   * @param tokenSessionTimeout optional session timeout for this token only in milliseconds (uses default if not set, see setSessionTimeout)
   * @param tokenFinalTimeout optional final timeout for this token only in milliseconds (uses default if not set, see setFinalTimeout).  If provided tokenSessionTimeout must also be provided.
   * @returns {*|promise} A promise that resolves to the token
   */
  export function createToken (context:string, user?:string, roles?:Array<string>, tokenSessionTimeout?:number, tokenFinalTimeout?: number)  : Q.Promise<string>;

  /**
   * Update a token's expiration.  Typically called because a client confirms session activity.  Calls the
   * implementation to do the touch
   * @param token
   * @param tokenSessionTimeout optional.  See createToken.
   * @param tokenFinalTimeout optional.  See createToken.
   * @returns {*|promise} A promise that resolves to the token
   */
  export function touchToken (token : string, tokenSessionTimeout?: number, tokenFinalTimeout?: number) : Q.Promise<string>;

  /**
   * Check to see if there is an unexpired token for a given role.   Calls the implementation to do the query.
   * @param token The token to check for.
   * @param role The role to check for.  Optional
   * @param touch Touch the token after checking.  If role is provided, optional, otherwise should not be provided.  Defaults to false.
   * @returns {*|promise} A promise that resolves to found or not found.  Does not indicate if expired.
   */
  export function checkToken (token: string, role?:string, touch?: boolean) : Promise<boolean>;
  
  /**
   * Delete a token.  Only deletes if no other delete operation is in progress.  Calls the implementation to actually
   * perform the delete.
   * @param token
   * @returns {*|promise} A promise that evaulates to true if implementation was actually called.  Promise resolves to
   * false otherwise
   */
  export function deleteToken (token: string) : Promise<boolean>;
  
  /**
   * Delete expired tokens if no deletions are currently ongoing.  Calls the implementation to actually perform the
   * delete and does not need to manage state.  The implementation shoudl return a promise.
   * @returns {*|promise} A promise that evaulates to true if implementation was actually called.  False if already
   * deleting.
   */
  export function deleteExpiredTokens() : Promise<boolean>;
}