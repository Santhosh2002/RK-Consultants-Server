const {
  getListing,
  getVisibleListing,
  createListing,
  updateListings,
  deleteListing,
  getListingDetails,
} = require("../controller/listing.controller");
const adminMiddleware = require("../middleware/admin.middleware");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Listings
 *   description: API endpoints for managing property listings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Listing:
 *       $ref: "#/components/schemas/Listing"
 */

/**
 * @swagger
 * /api/listing:
 *   get:
 *     summary: Get all visible listings
 *     description: Retrieve a list of visible listings.
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: A list of visible listings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listings:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Listing"
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getVisibleListing);

/**
 * @swagger
 * /api/listing/all:
 *   get:
 *     summary: Get all listings (Admin only)
 *     description: Retrieve a list of all listings, including hidden ones.
 *     tags: [Listings]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
 *     responses:
 *       200:
 *         description: A list of all listings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listings:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Listing"
 *       403:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal Server Error
 */
router.get("/all", adminMiddleware, getListing);

/**
 * @swagger
 * /api/listing/{id}:
 *   get:
 *     summary: Get listing details
 *     description: Retrieve details of a specific listing by ID.
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The listing ID
 *     responses:
 *       200:
 *         description: Listing details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listing:
 *                   $ref: "#/components/schemas/Listing"
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", getListingDetails);

/**
 * @swagger
 * /api/listing/create:
 *   post:
 *     summary: Create a new listing (Admin only)
 *     description: Adds a new listing to the database.
 *     tags: [Listings]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Listing"
 *     responses:
 *       201:
 *         description: Listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Listing"
 *       400:
 *         description: Bad Request - Missing required fields
 *       403:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal Server Error
 */
router.post("/create", adminMiddleware, createListing);

/**
 * @swagger
 * /api/listing/update/{id}:
 *   put:
 *     summary: Update a listing (Admin only)
 *     description: Update details of a specific listing by ID.
 *     tags: [Listings]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Listing"
 *     responses:
 *       200:
 *         description: Listing updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Listing"
 *       400:
 *         description: Bad Request - Invalid ID or missing fields
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/update/:id", adminMiddleware, updateListings);

/**
 * @swagger
 * /api/listing/delete/{id}:
 *   delete:
 *     summary: Delete a listing (Admin only)
 *     description: Remove a specific listing by ID.
 *     tags: [Listings]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The listing ID
 *     responses:
 *       200:
 *         description: Listing deleted successfully
 *       400:
 *         description: Bad Request - Invalid ID
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete/:id", adminMiddleware, deleteListing);

module.exports = router;
