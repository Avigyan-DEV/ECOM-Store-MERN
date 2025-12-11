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
  const [image, setImage] = useState("");        // Cloudinary URL
  const [rawImage, setRawImage] = useState(null); // Selected file

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);

  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  // -------------------------
  // Upload Image Handler
  // -------------------------
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setRawImage(file); // Store selected file so we can display name

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);

      setImage(res.image);    // Cloudinary URL
      setImageUrl(res.image); // Image preview
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // -------------------------
  // Submit Product Handler
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        image, // Cloudinary URL sent as string
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
      };

      const res = await createProduct(productData).unwrap();

      toast.success(`${res.name} is created`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message || "Product create failed. Try Again."
      );
    }
  };

  return (
    <div className="container xl:mx-36 sm:mx-0">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />

        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {/* Image Preview */}
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          {/* Image Upload */}
          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {rawImage ? rawImage.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Fields */}
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="two ml-10">
                <label>Price</label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="one">
                <label>Quantity</label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="two ml-10">
                <label>Brand</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label>Description</label>
            <textarea
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label>Count In Stock</label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label>Category</label>
                <br />
                <select
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
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