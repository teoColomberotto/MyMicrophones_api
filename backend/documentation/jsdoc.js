/**
 * @openapi
 * tags:
 *  name: Microphones
 *  description: Microphones are the main resource managed in the API. They are a set of specifications that represent the technical characteristics of a microphone
 */

/**
 * @openapi
 * tags:
 *  name: Users
 *  description: Users can log in and manage microphones resources.
 */

/**
 * @openapi
 * components:
 *  responses:
 *   BadRequest:
 *     description: The request header, body, params or query is invalid
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 *   Unauthorized:
 *     description: The user is not authorized to acces the resource
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 *   Forbidden:
 *     description: The user has not the required role to acces the resource
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 *   NotFound:
 *     description: The specified resource was not found
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 *   Internal:
 *     description: Ops, something went wrong
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Error'
 */

/**
 * @openapi
 * components:
 *  schemas:
 *   Error:
 *    type: object
 *    description: a custom error emitted by the API
 *    properties:
 *     status:
 *      type: number
 *      description: the error status code
 *     title:
 *      type: string
 *      description: the error title
 *     detail:
 *      type: string
 *      description: a breif description of what happened
 *     instance:
 *      type: string
 *      description: the error instance
 */
