const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerUiAssetPath = require("swagger-ui-dist").absolutePath();
const path = require("path");
const express = require("express");
// Swagger definition
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "API documentation for the backend",
    },
    servers: [
      {
        url: "http://localhost:3000", // Change if using a different port
        description: "Local server",
      },
      {
        url: "https://rk-consultants-server.vercel.app",
        description: "Prod Server",
      },
    ],
    components: {
      schemas: {
        Client: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Client's name",
              example: "John Doe",
            },
            email: {
              type: "string",
              description: "Client's email",
              example: "john@example.com",
            },
            phone: {
              type: "string",
              description: "Client's phone number",
              example: "+91-9876543210",
            },
            companyName: {
              type: "string",
              description: "Company name",
              example: "XYZ Ltd.",
            },
            website: {
              type: "string",
              description: "Website URL",
              example: "https://xyz.com",
            },
            industry: {
              type: "string",
              enum: [
                "Real Estate",
                "Construction",
                "Interior Design",
                "Legal Services",
                "Other",
              ],
              description: "Industry type",
              example: "Construction",
            },
            clientType: {
              type: "string",
              enum: ["Individual", "Business"],
              description: "Type of client",
              example: "Business",
            },
            image: {
              type: "string",
              description: "Profile or logo URL",
              example: "https://example.com/profile.jpg",
            },
            location: {
              type: "object",
              properties: {
                city: { type: "string", example: "Delhi" },
                state: { type: "string", example: "Delhi" },
                country: { type: "string", default: "India", example: "India" },
              },
            },
            socialLinks: {
              type: "object",
              properties: {
                linkedin: {
                  type: "string",
                  example: "https://linkedin.com/in/johndoe",
                },
                twitter: {
                  type: "string",
                  example: "https://twitter.com/johndoe",
                },
                facebook: {
                  type: "string",
                  example: "https://facebook.com/johndoe",
                },
              },
            },
            listings: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  listingId: {
                    type: "string",
                    description: "Listing ID",
                    example: "123abc",
                  },
                  title: {
                    type: "string",
                    description: "Listing title",
                    example: "Luxury Apartment",
                  },
                  slug: {
                    type: "string",
                    description: "Slug",
                    example: "luxury-apartment",
                  },
                  description: {
                    type: "string",
                    description: "Listing description",
                    example: "A premium luxury apartment in the city center",
                  },
                },
              },
            },
            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  projectId: {
                    type: "string",
                    description: "Project ID",
                    example: "xyz123",
                  },
                  title: {
                    type: "string",
                    description: "Project title",
                    example: "Skyline Towers",
                  },
                  slug: {
                    type: "string",
                    description: "Slug",
                    example: "skyline-towers",
                  },
                  description: {
                    type: "string",
                    description: "Project description",
                    example: "A commercial high-rise project",
                  },
                },
              },
            },
            status: {
              type: "string",
              enum: ["Active", "Inactive"],
              description: "Client status",
              example: "Active",
            },
            visible: {
              type: "boolean",
              description: "Visibility on website",
              example: true,
            },
            payments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  paymentId: {
                    type: "string",
                    description: "Razorpay payment ID",
                    example: "pay_ABC123",
                  },
                  orderId: {
                    type: "string",
                    description: "Razorpay order ID",
                    example: "order_XYZ789",
                  },
                  serviceId: {
                    type: "string",
                    description: "Service ID",
                    example: "6123456789abcdef01234567",
                  },
                  amount: {
                    type: "number",
                    description: "Payment amount",
                    example: 5000,
                  },
                  currency: {
                    type: "string",
                    description: "Currency",
                    example: "INR",
                  },
                  status: {
                    type: "string",
                    enum: ["Success", "Failed", "Pending"],
                    description: "Payment status",
                    example: "Success",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    description: "Payment creation time",
                    example: "2025-02-22T10:00:00Z",
                  },
                },
              },
            },
          },
          required: ["name"],
        },
        Listing: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Listing title",
              example: "Luxury Apartment",
            },
            slug: {
              type: "string",
              description: "SEO-friendly URL",
              example: "luxury-apartment",
            },
            description: {
              type: "string",
              description: "Listing description",
              example: "A premium luxury apartment in the city center",
            },
            contact: {
              type: "object",
              properties: {
                phone: {
                  type: "string",
                  description: "Contact phone",
                  example: "+91-9876543210",
                },
                email: {
                  type: "string",
                  description: "Contact email",
                  example: "owner@example.com",
                },
              },
            },
            images: {
              type: "array",
              items: { type: "string" },
              description: "Array of image URLs",
            },
            video: {
              type: "string",
              description: "Video tour URL",
              example: "https://example.com/video.mp4",
            },
            virtualTour: {
              type: "string",
              description: "3D virtual tour link",
              example: "https://example.com/virtual-tour",
            },
            brochure: {
              type: "string",
              description: "Brochure download URL",
              example: "https://example.com/brochure.pdf",
            },
            visible: {
              type: "boolean",
              description: "Visibility on the website",
              example: true,
            },
            propertyType: {
              type: "string",
              enum: ["Apartment", "Villa", "Office", "Land", "Shop", "Other"],
              description: "Type of property",
              example: "Apartment",
            },
            transactionType: {
              type: "string",
              enum: ["Rent", "Sale"],
              description: "Transaction type",
              example: "Sale",
            },
            furnishingStatus: {
              type: "string",
              enum: ["Unfurnished", "Semi-Furnished", "Fully-Furnished"],
              description: "Furnishing status",
              example: "Fully-Furnished",
            },
            status: {
              type: "string",
              enum: ["Available", "Sold", "Rented", "Not Disclosed"],
              description: "Current status",
              example: "Available",
            },
            ownership: {
              type: "string",
              description: "Ownership status",
              example: "Freehold",
            },
            landmark: {
              type: "string",
              description: "Landmark near the property",
              example: "Near Central Mall",
            },
            nearby: {
              type: "array",
              items: { type: "string" },
              description: "Nearby places (e.g., school, hospital, metro)",
              example: ["School", "Hospital", "Metro"],
            },
            amenities: {
              type: "array",
              items: { type: "string" },
              description: "List of amenities",
              example: ["Swimming Pool", "Gym", "24/7 Security"],
            },
            parking: {
              type: "string",
              description: "Parking availability",
              example: "2 covered parking spaces",
            },
            location: {
              type: "object",
              properties: {
                street: { type: "string", example: "MG Road" },
                city: { type: "string", example: "Mumbai" },
                state: { type: "string", example: "Maharashtra" },
                country: { type: "string", example: "India" },
                latitude: { type: "number", example: 19.076 },
                longitude: { type: "number", example: 72.8777 },
              },
            },
            approval: {
              type: "string",
              enum: ["Pending", "Approved", "Rejected"],
              description: "Approval status",
              example: "Approved",
            },
            variants: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  bhk: {
                    type: "string",
                    description: "BHK type",
                    example: "2BHK",
                  },
                  carpetArea: {
                    type: "string",
                    description: "Carpet area",
                    example: "1111 sq ft",
                  },
                  builtUpArea: {
                    type: "string",
                    description: "Built-up area",
                    example: "1500 sq ft",
                  },
                  facing: {
                    type: "string",
                    description: "Facing direction",
                    example: "East",
                  },
                  price: {
                    type: "number",
                    description: "Price in INR",
                    example: 5000000,
                  },
                  currency: { type: "string", default: "INR" },
                  bedrooms: {
                    type: "number",
                    description: "Number of bedrooms",
                    example: 2,
                  },
                  bathrooms: {
                    type: "number",
                    description: "Number of bathrooms",
                    example: 2,
                  },
                  images: {
                    type: "array",
                    items: { type: "string" },
                    description: "Variant images",
                  },
                  video: {
                    type: "string",
                    description: "Variant video tour URL",
                  },
                  balcony: {
                    type: "number",
                    description: "Number of balconies",
                    example: 1,
                  },
                  floor: {
                    type: "string",
                    description: "Floor number",
                    example: "5th Floor",
                  },
                  totalFloors: {
                    type: "string",
                    description: "Total floors in the building",
                    example: "10",
                  },
                  availability: {
                    type: "boolean",
                    description: "Availability status",
                    example: true,
                  },
                },
              },
            },
          },
          required: [
            "title",
            "contact",
            "propertyType",
            "transactionType",
            "status",
          ],
        },
        General: {
          type: "object",
          properties: {
            logo: {
              type: "string",
              description: "Logo URL",
              example: "https://example.com/logo.png",
            },
            title: {
              type: "string",
              description: "Company or website title",
              example: "RK Consultants",
            },
            about: {
              type: "string",
              description: "About the company",
              example:
                "We provide top consulting services for real estate and legal matters.",
            },
            contact: {
              type: "string",
              description: "Contact details",
              example: "info@rkconsultants.com",
            },
            email: {
              type: "string",
              description: "Email address",
              example: "contact@rkconsultants.com",
            },
            phone: {
              type: "string",
              description: "Phone number",
              example: "+91-9876543210",
            },
            address: {
              type: "string",
              description: "Office address",
              example: "MG Road, Mumbai, India",
            },
            facebook: {
              type: "string",
              description: "Facebook page URL",
              example: "https://facebook.com/rkconsultants",
            },
            instagram: {
              type: "string",
              description: "Instagram profile URL",
              example: "https://instagram.com/rkconsultants",
            },
            linkedin: {
              type: "string",
              description: "LinkedIn profile URL",
              example: "https://linkedin.com/company/rkconsultants",
            },
            terms: {
              type: "string",
              description: "Terms and conditions URL",
              example: "https://rkconsultants.com/terms",
            },
            privacy: {
              type: "string",
              description: "Privacy policy URL",
              example: "https://rkconsultants.com/privacy",
            },
            youtube: {
              type: "string",
              description: "YouTube channel URL",
              example: "https://youtube.com/rkconsultants",
            },
            shippingPolicy: {
              type: "string",
              description: "Shipping policy details",
              example: "Shipping within 7 business days",
            },
            refundPolicy: {
              type: "string",
              description: "Refund policy details",
              example: "Refunds available within 30 days of purchase",
            },
          },
          required: [
            "logo",
            "title",
            "about",
            "contact",
            "email",
            "phone",
            "address",
            "facebook",
            "instagram",
            "linkedin",
            "terms",
            "privacy",
          ],
        },
        Payment: {
          type: "object",
          properties: {
            clientId: {
              type: "string",
              description: "Reference to the Client making the payment",
              example: "6123456789abcdef01234567",
            },
            serviceId: {
              type: "string",
              description: "Reference to the Service for which payment is made",
              example: "6123456789abcdef01234568",
            },
            amount: {
              type: "number",
              description: "Payment amount",
              example: 5000,
            },
            currency: {
              type: "string",
              description: "Currency of the transaction",
              example: "INR",
            },
            paymentId: {
              type: "string",
              description: "Unique ID from the payment gateway",
              example: "pay_ABC123",
            },
            orderId: {
              type: "string",
              description: "Order ID associated with the payment",
              example: "order_XYZ789",
            },
            status: {
              type: "string",
              enum: ["Success", "Failed", "Pending"],
              description: "Status of the payment",
              example: "Success",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the payment was created",
              example: "2025-02-22T10:00:00Z",
            },
          },
          required: [
            "clientId",
            "serviceId",
            "amount",
            "paymentId",
            "orderId",
            "status",
          ],
        },
        Project: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Project title",
              example: "Skyline Towers",
            },
            slug: {
              type: "string",
              description: "SEO-friendly URL",
              example: "skyline-towers",
            },
            description: {
              type: "string",
              description: "Project description",
              example: "A premium commercial high-rise project",
            },
            contact: {
              type: "object",
              properties: {
                phone: {
                  type: "string",
                  description: "Contact phone",
                  example: "+91-9876543210",
                },
                email: {
                  type: "string",
                  description: "Contact email",
                  example: "developer@example.com",
                },
              },
            },
            images: {
              type: "array",
              items: { type: "string" },
              description: "Array of image URLs",
            },
            video: {
              type: "string",
              description: "Video tour URL",
              example: "https://example.com/video.mp4",
            },
            virtualTour: {
              type: "string",
              description: "3D virtual tour link",
              example: "https://example.com/virtual-tour",
            },
            brochure: {
              type: "string",
              description: "Brochure download URL",
              example: "https://example.com/brochure.pdf",
            },
            visible: {
              type: "boolean",
              description: "Visibility on the website",
              example: true,
            },
            propertyType: {
              type: "string",
              enum: ["Apartment", "Villa", "Office", "Land", "Shop", "Other"],
              description: "Type of property",
              example: "Office",
            },
            transactionType: {
              type: "string",
              enum: ["Rent", "Sale"],
              description: "Transaction type",
              example: "Sale",
            },
            furnishingStatus: {
              type: "string",
              enum: ["Unfurnished", "Semi-Furnished", "Fully-Furnished"],
              description: "Furnishing status",
              example: "Fully-Furnished",
            },
            status: {
              type: "string",
              enum: ["Available", "Sold", "Rented", "Not Disclosed"],
              description: "Current status",
              example: "Available",
            },
            ownership: {
              type: "string",
              description: "Ownership status",
              example: "Freehold",
            },
            landmark: {
              type: "string",
              description: "Landmark near the project",
              example: "Near City Center Mall",
            },
            nearby: {
              type: "array",
              items: { type: "string" },
              description: "Nearby places (e.g., school, hospital, metro)",
              example: ["School", "Hospital", "Metro"],
            },
            amenities: {
              type: "array",
              items: { type: "string" },
              description: "List of amenities",
              example: ["Swimming Pool", "Gym", "24/7 Security"],
            },
            parking: {
              type: "string",
              description: "Parking availability",
              example: "Basement parking available",
            },
            location: {
              type: "object",
              properties: {
                street: { type: "string", example: "Main Street" },
                city: { type: "string", example: "Bangalore" },
                state: { type: "string", example: "Karnataka" },
                country: { type: "string", example: "India" },
                latitude: { type: "number", example: 12.9716 },
                longitude: { type: "number", example: 77.5946 },
              },
            },
            variants: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  bhk: {
                    type: "string",
                    description: "BHK type",
                    example: "3BHK",
                  },
                  carpetArea: {
                    type: "string",
                    description: "Carpet area",
                    example: "1200 sq ft",
                  },
                  builtUpArea: {
                    type: "string",
                    description: "Built-up area",
                    example: "1600 sq ft",
                  },
                  facing: {
                    type: "string",
                    description: "Facing direction",
                    example: "North-East",
                  },
                  price: {
                    type: "number",
                    description: "Price in INR",
                    example: 7500000,
                  },
                  currency: { type: "string", default: "INR" },
                  bedrooms: {
                    type: "number",
                    description: "Number of bedrooms",
                    example: 3,
                  },
                  bathrooms: {
                    type: "number",
                    description: "Number of bathrooms",
                    example: 3,
                  },
                  images: {
                    type: "array",
                    items: { type: "string" },
                    description: "Variant images",
                  },
                  video: {
                    type: "string",
                    description: "Variant video tour URL",
                  },
                  balcony: {
                    type: "number",
                    description: "Number of balconies",
                    example: 2,
                  },
                  floor: {
                    type: "string",
                    description: "Floor number",
                    example: "7th Floor",
                  },
                  totalFloors: {
                    type: "string",
                    description: "Total floors in the building",
                    example: "12",
                  },
                  availability: {
                    type: "boolean",
                    description: "Availability status",
                    example: true,
                  },
                },
              },
            },
          },
          required: [
            "title",
            "contact",
            "propertyType",
            "transactionType",
            "status",
          ],
        },
        Service: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Service name",
              example: "Interior Design Consultation",
            },
            slug: {
              type: "string",
              description: "SEO-friendly URL",
              example: "interior-design-consultation",
            },
            description: {
              type: "string",
              description: "Detailed description of the service",
              example: "We offer premium interior design services.",
            },
            category: {
              type: "string",
              enum: [
                "Construction",
                "Interior Design",
                "Real Estate Consulting",
                "Legal Services",
                "Other",
              ],
              description: "Service category",
              example: "Interior Design",
            },
            serviceType: {
              type: "string",
              description: "Type of service",
              example: "Premium",
            },
            price: {
              type: "number",
              description: "Price of the service",
              example: 10000,
            },
            currency: {
              type: "string",
              default: "INR",
              description: "Currency of the price",
              example: "INR",
            },
            images: {
              type: "array",
              items: { type: "string" },
              description: "URLs of service images",
              example: [
                "https://example.com/image1.jpg",
                "https://example.com/image2.jpg",
              ],
            },
            status: {
              type: "string",
              enum: ["Available", "Temporarily Unavailable", "Discontinued"],
              description: "Current availability status of the service",
              example: "Available",
            },
            subServices: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Sub-service name",
                    example: "3D Visualization",
                  },
                  description: {
                    type: "string",
                    description: "Description of sub-service",
                    example:
                      "High-quality 3D visualization of interior spaces.",
                  },
                  price: {
                    type: "number",
                    description: "Price of the sub-service",
                    example: 5000,
                  },
                  currency: {
                    type: "string",
                    default: "INR",
                    description: "Currency of the price",
                    example: "INR",
                  },
                },
              },
            },
          },
          required: ["name", "category", "price", "status"],
        },
        Stats: {
          type: "object",
          properties: {
            happyClients: {
              type: "number",
              description: "Total number of happy clients",
              example: 150,
            },
            projects: {
              type: "number",
              description: "Total number of completed projects",
              example: 50,
            },
            daysOfWork: {
              type: "number",
              description: "Total number of days of work",
              example: 365,
            },
          },
          required: ["happyClients", "projects", "daysOfWork"],
        },
        User: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "Unique username for the user",
              example: "john_doe",
            },
            password: {
              type: "string",
              description: "Hashed password of the user",
              example: "$2a$12$XyZ12345abcd6789EfGhIj",
            },
            role: {
              type: "string",
              description: "User role (e.g., admin, user)",
              example: "user",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the user was created",
              example: "2025-02-22T10:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the user was last updated",
              example: "2025-02-22T12:00:00Z",
            },
          },
          required: ["username", "password", "role"],
        },
      },
    },
  },

  apis: ["./routes/*.js"], // Path to API route files
};

// Initialize Swagger
const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/swagger-ui", express.static(swaggerUiAssetPath));

  app.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCssUrl: CSS_URL, // ✅ Ensure correct CSS loading
    })
  );
  console.log("Swagger Docs available at http://localhost:3000");
};

module.exports = swaggerDocs;
