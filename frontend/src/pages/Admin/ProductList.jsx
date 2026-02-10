import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);

  // ✅ Cloudinary image URL only
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  /* =========================
     IMAGE UPLOAD HANDLER
  ========================= */
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Optional frontend validation
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImageUrl(res.image); // ✅ Cloudinary URL
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  /* =========================
     CREATE PRODUCT HANDLER
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Please upload an image first");
      return;
    }

    try {
      const productData = {
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
        image: imageUrl, // ✅ Cloudinary URL
      };

      const { data } = await createProduct(productData);

      if (data?.error) {
        toast.error("Product create failed. Try again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try again.");
    }
  };

  return (
    <div className="container xl:mx-36 sm:mx-0">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />

        <div className="md:w-3/4 p-3">
          <div className="h-12 text-xl font-bold">Create Product</div>

          {/* IMAGE PREVIEW */}
          {imageUrl && (
            <div className="text-center mb-3">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] rounded"
              />
            </div>
          )}

          {/* IMAGE UPLOAD */}
          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {imageUrl ? "Image Uploaded" : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          {/* FORM */}
          <div className="p-3">
            <div className="flex flex-wrap gap-6">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  className="p-4 mb-3 w-72 border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label>Price</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-72 border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-72 border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div>
                <label>Brand</label>
                <input
                  type="text"
                  className="p-4 mb-3 w-72 border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label>Description</label>
            <textarea
              className="p-3 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between gap-6">
              <div>
                <label>Count In Stock</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-72 border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label>Category</label>
                <select
                  className="p-4 mb-3 w-72 border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" hidden>
                    Select Category
                  </option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
