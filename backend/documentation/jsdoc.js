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

/**
 * @openapi
 * components:
 *  schemas:
 *   UserRequestBody:
 *    type: object
 *    properties:
 *           name:
 *            type: string
 *            description: the user name
 *            example: John Doe
 *           email:
 *            type: string
 *            description: the user email adress
 *            example: usermail@gmail.com
 *           password:
 *            type: string
 *            description: the user password
 *            example: UserPassword1_
 */

/**
 * @openapi
 * components:
 *  schemas:
 *   UserLoginRequestBody:
 *    type: object
 *    properties:
 *           email:
 *            type: string
 *            description: the user email adress
 *            example: usermail@gmail.com
 *           password:
 *            type: string
 *            description: the user password
 *            example: UserPassword1_
 */

/**
 * @openapi
 * components:
 *  schemas:
 *   CreateUserResponse:
 *    type: object
 *    properties:
 *           _id:
 *            type: number
 *            description: the user unique id
 *            example: 507f1f77bcf86cd799439011
 *           name:
 *            type: string
 *            description: the user name
 *            example: John Doe
 *           email:
 *            type: string
 *            description: the user email adress
 *            example: usermail@gmail.com
 *           token:
 *            type: string
 *            description: the user token for authentication
 *            example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOiIzMGQiLCJ1c2VySWQiOiI2MjIzOWIwNDAzM2ExNTZmNmM4Mjc5NDAiLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE2NDY1MDA2MTJ9.yvjKfYdxTGT5YJdBvnMRB4Li231XFiogu_JjEd0a1bk
 */
