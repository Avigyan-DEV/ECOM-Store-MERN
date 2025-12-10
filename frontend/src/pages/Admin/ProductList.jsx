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
  const [image, setImage] = useState(null); // filename display
  const [imageUrl, setImageUrl] = useState(""); // Cloudinary URL
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      const uploadedImageUrl = res.image || res.data?.image || null;

      if (!uploadedImageUrl) {
        toast.error("Upload failed. Try again.");
        return;
      }

      setImage(file);
      setImageUrl(uploadedImageUrl); // store Cloudinary URL
      toast.success(res.message || "Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error.error || "Image upload failed");
    }
  };

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
        price: Number(price),
        category,
        quantity: Number(quantity),
        brand,
        countInStock: Number(stock),
        image: imageUrl, // Cloudinary URL as string
      };

      const result = await createProduct(productData).unwrap();

      toast.success(`${result.name} is created`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message || "Product creation failed. Try again."
      );
    }
  };

  return (
    <div className="container xl:mx-36 sm:mx-0">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-2xl font-semibold mb-4">Create Product</div>

          {/* Preview Uploaded Image */}
          {imageUrl && (
            <div className="text-center mb-5">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] rounded-lg object-cover"
              />
            </div>
          )}

          {/* Image Upload */}
          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Inputs */}
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label>Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label>Price</label> <br />
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
                <label>Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label>Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label className="my-5 block">Description</label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-between flex-wrap">
              <div>
                <label>Count In Stock</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label>Category</label> <br />
                <select
                  value={category}
                  className="p-4 mb-3 w-120 border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled hidden>
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
