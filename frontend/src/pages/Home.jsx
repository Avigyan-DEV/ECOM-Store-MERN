import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Message from "../components/Message";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <Message variant="danger">
        {isError?.data?.message || isError.error}
      </Message>
    );

  return (
    <>
      {!keyword && <Header />}

      <div className="flex flex-col md:flex-row justify-between items-center mt-10 px-8">
        <h1 className="text-3xl md:text-[3rem] mb-4 md:mb-0">
          Special Products
        </h1>
        <Link
          to="/shop"
          className="bg-pink-600 font-bold rounded-full py-2 px-6 md:px-10 hover:bg-pink-700"
        >
          Shop
        </Link>
      </div>

      <div className="mt-8 flex justify-center flex-wrap gap-6">
        {data.products && data.products.length > 0 ? (
          data.products.map((product) => (
            <div key={product._id}>
              <Product product={product} />
            </div>
          ))
        ) : (
          <Message variant="info">No products found.</Message>
        )}
      </div>
    </>
  );
};

export default Home;
