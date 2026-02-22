const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    packSizes: [{ type: String }],
    prices: [{ type: Number }],
    category: { type: String, required: true },
    unit: { type: String },
    image: { type: String },

    description: String,
    benefits: [String],
    usage: String,
    features: [String],

    // ✅ ADD BELOW
    isFeatured: { type: Boolean, default: false },
    tagline: { type: String },
    featuredDescription: { type: String },
  },
  { timestamps: true }
);